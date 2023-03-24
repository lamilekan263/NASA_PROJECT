import mongoose, { Schema, Document } from 'mongoose'



export interface Iplanet {
    keplerName: string
}


export interface IplanetModel extends Iplanet, Document {}

const planetSchema = new Schema({
    keplerName: {
        type: String,
        required: true
    }
})


export default  mongoose.model<IplanetModel>('planet', planetSchema)