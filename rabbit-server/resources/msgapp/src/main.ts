import { appModule } from "./module";

const bootstrap = async () => {
    const { httpServer, server } = await appModule.startApollo()

    httpServer.listen(4000, () => console.log('server is ready at http://localhost:4000/' + server.graphqlPath))
}

bootstrap()