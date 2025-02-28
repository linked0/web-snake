import { AppModule } from './module'
import express from 'express'
import { JwtPayload } from '@shoppingapp/common'

declare global {
    namespace Express {
        interface Request {
            currentUser?: JwtPayload;
            uploaderError?: Error
        }
    }
}

const bootstrap = () => {
    const app  = new AppModule(express())

    app.start()
}

bootstrap()