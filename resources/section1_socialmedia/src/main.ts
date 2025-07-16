import * as dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response, NextFunction } from 'express'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import { newCommentRouter, newPostRouter, deleteCommentRouter, deletePostRouter, updatePostRouter, showPostRouter } from './routers'

const app = express()

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
}))

app.use(urlencoded())
app.use(json())

app.use(newPostRouter)
app.use(deletePostRouter)
app.use(updatePostRouter)
app.use(showPostRouter)

app.use(newCommentRouter)
app.use(deleteCommentRouter)


app.all('*', async (req, res, next) => {
    const error = new Error('not found') as CustomError
    error.status = 404
    next(error)
})

declare global {
    interface CustomError extends Error {
        status?: number;
    }
}

app.use((error: CustomError, req:Request, res: Response, next: NextFunction) => {
    if(error.status) {
        return res.status(error.status).json({ message: error.message })
    }

    return res.status(500).send('something went wrong!')
})

const start = async () => {
    if(!process.env.MONGO_URI) 
        throw new Error('MONGO_URI must be defined!')

    try {
        mongoose.connect(process.env.MONGO_URI)
    }catch(err) {
        console.log(err)
    }

    app.listen(8080, () => console.log('server is up and running on port 8080'))
}

start()
