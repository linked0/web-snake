import * as dotenv from 'dotenv'
dotenv.config()
import 'reflect-metadata'
import { Socket } from 'socket.io';

import { appModule } from "./module";

declare global {
    namespace Express {
        interface Request {
            socketIo?: Socket 
        }
    }
}

const bootstrap = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('database error')
    }

    const { httpServer, server } = await appModule.startApollo()

    httpServer.listen(4000, 
        () => console.log('server is ready at http://localhost:4000' 
        + server.graphqlPath))
}

bootstrap()
