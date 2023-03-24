import mongoose, { Schema, Document } from "mongoose";



export interface Ilaunch  {
    flightNumber: number,
    mission: string,
    rocket: string,
    launchDate:  Date,
    target: string,
    customers: string[],
    upcoming: boolean,
    success: boolean
}


export interface IlaunchModel extends Ilaunch, Document {}

const launchesModel = new Schema({
    flightNumber: {
        type: Number,
        required: true
    },
    mission: {
        type: String,
        required: true
    },
     rocket: {
        type: String,
        required: true
     },
      launchDate: {
        type: Date,
        required: true
      },
      target: {
        type: String,
        // required: true
     },
      customers: {
        type: [String],
        required: true
    },
       upcoming: {
        type: Boolean,
           required: true,
        default: false
     },
      success: {
        type: Boolean,
        required: true,
        default: false
    }
})


export default mongoose.model<IlaunchModel>('launch', launchesModel)