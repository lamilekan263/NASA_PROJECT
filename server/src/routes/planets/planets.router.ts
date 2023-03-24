import express from 'express';
import { httGetAllPlanets } from './planets.controller'



export const PlanetRouter = express.Router();

PlanetRouter.get('/',httGetAllPlanets);