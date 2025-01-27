import { Resolvers } from '../__generated__/resolvers-types'


export const authResolvers: Resolvers = {
    Mutation: {
        async signup(parent, { input }, context){
            
            return {
                user: {
                    id: 1,
                    ...input
                },
                jwt: 'odofksl'
            }
        }
    },

    Query: {
        get: () => 'Ok'
    }
}