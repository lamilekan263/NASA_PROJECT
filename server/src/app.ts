import express, { Request, Response } from "express";
import cors from 'cors';
import morgan from "morgan";
import path from "path";

import Api from './routes/api'

export const app = express()
app.use(morgan('combined'))
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, '..','public')))

app.use('/v1',Api)


app.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..','public','index.html'))
})

