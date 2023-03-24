import http from 'http';
import {app} from './app'
import { loadPlanetsData } from './models/planets/planets.model';
import { loadLaunchesData } from './models/launches/launches.model';
import mongoose from 'mongoose';
import { connectMongo } from './services/mongo';


const server = http.createServer(app);

const PORT = process.env.PORT || 8000


  

async function startServer() {
    await connectMongo()
    await loadPlanetsData()
    await loadLaunchesData()
    server.listen(PORT, () => {
    console.log(`server running successful on  ${PORT}`);
    
})
}

startServer()