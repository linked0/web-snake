import mongoose from 'mongoose'
import { app } from './app'

const start = async () => {
    if(!process.env.MONGO_URI) throw new Error('MONGO_URI is required!')

    if(!process.env.JWT_KEY) throw new Error('JWT_KEY is required!')

    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch(err) {
        throw new Error('database error!')
    }
    
    app.listen(8080, () => console.log('server is up and running on port 8080'))
}

start()
