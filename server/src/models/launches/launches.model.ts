
import Axios from 'axios'
import { FilterQuery } from 'mongoose';

import planetsMongo from '../planets/planets.mongo';
import launchesMongoDatabse, { Ilaunch, IlaunchModel } from './launches.mongo'


const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

export async function saveLaunch(launch: Ilaunch) {
  
    await launchesMongoDatabse.findOneAndUpdate(
        { flightNumber: launch.flightNumber },
        launch,
        { upsert: true }
    )
}

async function findLaunch(filter: FilterQuery<IlaunchModel> | undefined) {
    return await launchesMongoDatabse.findOne(filter)
}

 export async function existLaunchWithId(launchId: number)  {
     const existLanuch = await findLaunch({ flightNumber: launchId })
     return existLanuch
}

export async function getAllLaunches(skip: number, limit:number) {
    return await launchesMongoDatabse.find({}).sort({flightNumber: 1}).skip(skip).limit(limit)
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesMongoDatabse.findOne().sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER
    }; 
    return latestLaunch?.flightNumber
}


export async function scheduleNewLaunch(launch: Ilaunch) {
      const planet = await planetsMongo.findOne({ keplerName: launch.target })
    
    if (!planet) {
        throw new Error('Sorry invalid destination')
    }
    const newFlightNumber = await getLatestFlightNumber() + 1
    
    const newLaunch = Object.assign(launch, {
        flightNumber: newFlightNumber,
        success: true,
        upcoming: true,
        customers: ['Zero to mastery', 'NASA']
    })

    await saveLaunch(newLaunch)
}




async function populateLaunches() {
     console.log('Downloading launch Data')
   const response = await Axios.post(SPACEX_API_URL, {
        query: {},
       options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1
                    }
                }
            ]
        }
   })
    
    if (response.status !== 200) {
        console.log('problem downloading launch data');
        throw new Error('Launch data download failed')
    }
    const launchDocs = response.data.docs;

    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads']
        const customers = payloads.flatMap((payload:any) => {
            return payload['customers']
        })

        const launch: Ilaunch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
            target: ''
        }
         console.log(launch)
        await saveLaunch(launch)
    }
}
export async function loadLaunchesData() {
  const firstLaunch =  await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat'
    })

    if (firstLaunch) {
        console.log('launch data us already loaded');
        return
    } else {
       await  populateLaunches()
    }
   
    
}

export async function abortedLaunchById(launchId: number) {
    const aborted = await launchesMongoDatabse.updateOne({ flightNumber: launchId }, {
        success: false,
        upcoming: false
    })

    return aborted.acknowledged;

}

