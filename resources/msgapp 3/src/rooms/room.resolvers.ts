import { GraphQLError } from 'graphql'
import { Resolvers } from '../__generated__/resolvers-types'

export const roomResolvers: Resolvers = {
    Mutation: {
        async sendMsg(parent, { input }, context) {
            if(!context.authorized) throw new GraphQLError('unAuthorized', 
            { extensions: { code: 'UNAUTHORIZED' } })

            return {
                id: input.roomId,
                users: [],
                messages: [
                    {
                        from: 1,
                        content: input.message
                    }
                ]
            }
        }
    }
}