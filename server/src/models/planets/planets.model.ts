import path from "path";
const {parse} = require('csv-parse');
const fs = require('fs');


import Planet from './planets.mongo'


function isHabitablePlanet(planet : any) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}


export function loadPlanetsData() {
  return new Promise<void>((resolve, reject) => {
    '../../../'
fs.createReadStream(path.join(__dirname, '..', '..','..','data', "kepler_data.csv"))
  .pipe(parse({
    comment: '#',
    columns: true,
  }))
  .on('data', async(data: any) => {
    if (isHabitablePlanet(data)) {
savePlanet(data)
    }
  })
  .on('error', (err: Error) => {
    console.log(err);
  })
  .on('end', async () => {
    
    const countPlanetsFound = await getAllPlanets()
    console.log(`${countPlanetsFound.length} habitable planets found!`);
   
    resolve()
  });
  })
}


async function savePlanet(planet:any) {
  try {
     await Planet.updateOne({keplerName: planet.kepler_name}, {keplerName: planet.kepler_name}, { upsert: true})
  } catch (error) {
    if (error instanceof Error) {
        console.log(`we could not save a planet ${error.message}`)
    }
   
  }
}


export async function getAllPlanets() {
  return await Planet.find({},{'__v': 0, '_id': 0,});
}
