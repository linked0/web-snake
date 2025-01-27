import * as dotenv from 'dotenv'
dotenv.config()
import 'reflect-metadata'

import { appModule } from "./module";

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
