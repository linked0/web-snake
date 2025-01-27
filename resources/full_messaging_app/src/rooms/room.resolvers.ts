import { GraphQLError } from 'graphql'
import { userService } from '../auth/user/user.service'
import { Resolvers } from '../__generated__/resolvers-types'
import { roomService } from './room/room.service'

export const roomResolvers: Resolvers = {
    Mutation: {
        async sendMsg(parent, { input }, context) {
            if(!context.authorized) throw new GraphQLError('unAuthorized', 
            { extensions: { code: 'UNAUTHORIZED' } })

            return await roomService.addMessageToRoom(input.roomId, {
                content: input.message,
                from: context.currentUser.userId
            }, context.io)
        },

        async createRoom(parent, { input }, context) {
            if(!context.authorized) throw new GraphQLError('unAuthorized', 
            { extensions: { code: 'UNAUTHORIZED' } })

            const roomHasUsers = await roomService
                .findRoomWithUsersId(input.reciever, context.currentUser.userId)

            if(roomHasUsers) throw new GraphQLError('Room already exists')
 
            const participants = await userService.findByIds([
                context.currentUser.userId,
                input.reciever
            ])

            return await roomService.createRoom(participants, {
                content: input.message,
                from: context.currentUser.userId
            })

        }
    },

    Query: {
        async getRooms(parent, {}, context) {
            if(!context.authorized) throw new GraphQLError('unAuthorized', 
            { extensions: { code: 'UNAUTHORIZED' } })

            return await roomService.getAllRooms(context.currentUser.userId)
        }
    }
}