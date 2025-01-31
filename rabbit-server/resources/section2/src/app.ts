import * as dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import cookieSession from 'cookie-session';
import { 
    newPostRouter, 
    deletePostRouter, 
    updatePostRouter, 
    showPostRouter,
    addImagesRouter,
    deleteImagesRouter,
    
    newCommentRouter, 
    deleteCommentRouter,

    signinRouter,
    signupRouter,
    currentUserRouter,
    signoutRouter

} from './routers'
import { requireAuth, currentUser, errorHandler, NotFoundError } from '../common';

const app = express()

app.use(cors(
    { 
        origin: "*",
        optionsSuccessStatus: 200
    }
))

app.set('trust proxy', true);

app.use(urlencoded({
    extended: false
}))
app.use(json())
app.use(cookieSession({
    signed: false,
    secure: false,
}))


app.use(signupRouter)
app.use(signinRouter)
app.use(currentUser)
app.use(currentUserRouter)
app.use(signoutRouter)

app.use( newPostRouter)
app.use( deletePostRouter)
app.use( updatePostRouter)
app.use( addImagesRouter)
app.use( deleteImagesRouter)
app.use(showPostRouter)

app.use( newCommentRouter)
app.use( deleteCommentRouter)

app.all('*', (req, res, next) => {
    next(new NotFoundError())
})

app.use(errorHandler)

export { app }