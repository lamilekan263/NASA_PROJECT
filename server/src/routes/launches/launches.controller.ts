import { Request, Response } from "express";
import { abortedLaunchById, scheduleNewLaunch, existLaunchWithId, getAllLaunches } from "../../models/launches/launches.model";
import { getPagination } from "../../services/query";



export async function httpGetAllLaunches(req: Request, res: Response) {

    const { limit, skip } = getPagination(req.query);
    const launches = await getAllLaunches(skip, limit)
    return res.status(200).json(launches)
}


export async function httpAddNewLaunch(req: Request, res: Response) {
    const launch = req.body;
    console.log(launch.launchDate, 'date')
    if (!launch.mission || !launch.rocket || !launch.target || !launch.launchDate) {
        return res.status(400).json({
            error: 'Missing launch details'
        })
    }

    // if (isNaN(launch.launchDate)) {
    //     return res.status(400).json({
    //         error: 'Invalid date'
    //     })
    // }
    launch.launchDate = new Date(launch.launchDate)
   await  scheduleNewLaunch(launch)
    return res.status(201).json(launch)
}
 

export async function httpAbortLaunch(req: Request, res: Response) {
    const launchId = req.params.id;

    const existLaunch = await existLaunchWithId(Number(launchId));
    if (!existLaunch) {
        return res.status(404).json({
            error: 'Launch not found'
        })
    }

    const aborted = await abortedLaunchById(Number(launchId))

    if(!aborted) {
        return res.status(400).json({
            error: 'Launch could not be aborted'
        })
    }
    return res.status(200).json({
       ok : true
   })
}