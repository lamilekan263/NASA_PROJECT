import { Request, Response } from "express";
 import { getAllPlanets } from "../../models/planets/planets.model";




export async function httGetAllPlanets(req: Request, res: Response) {
    return res.status(200).json(await getAllPlanets())
}

 