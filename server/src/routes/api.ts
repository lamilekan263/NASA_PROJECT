import express from "express";
import { PlanetRouter } from "./planets/planets.router";
import { launchesRouter } from "./launches/launches.router";



const api = express.Router()

api.use('/planets',PlanetRouter)
api.use('/launches', launchesRouter)


export default api