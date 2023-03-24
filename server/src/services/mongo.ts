import mongoose from "mongoose"


const MONGO_URI = 'mongodb+srv://lamilekan263:Atanda263@api.7nsm2l3.mongodb.net/?retryWrites=true&w=majority'
mongoose.connection.once('open', () => {
    console.log('database connection successful')
})

mongoose.connection.on('error', (err) => {
    console.error(`database connection unsuccessful ${err.message}`)
})
mongoose.set('strictQuery', true)


export async function connectMongo(){
    await mongoose.connect(MONGO_URI)
}