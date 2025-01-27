import { Resolvers } from '../__generated__/resolvers-types'
import { userService } from './user/user.service'
import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql'
import bcrypt from 'bcrypt'

export const authResolvers: Resolvers = {
    Mutation: {
        async signup(parent, { input }, context){
            const existingUser = await userService.findOneByEmail(input.email)

            if(existingUser) throw new GraphQLError('user already exists', 
            { extensions: { code: 'BAD_REQUEST' } })

            const user = await userService.create(input)
            
            const jwtToken = jwt.sign(
                {email: input.email, userId: user.id},
                process.env.JWT_KEY!,
                { expiresIn: '7 days' })

            return { user, jwt: jwtToken }

        },
        async signin(parent, { input }, context) {
            const user = await userService.findOneByEmail(input.email)

            if(!user) throw new GraphQLError('wrong credentials', 
            { extensions: { code: 'BAD_REQUEST' } })

            const correctPwd = await bcrypt.compare(input.password, user.password)
            if(!correctPwd) throw new GraphQLError('wrong credentials',
            { extensions: { code: 'BAD_REQUEST' } })

            const jwtToken = jwt.sign(
                {email: input.email, userId: user.id},
                process.env.JWT_KEY!,
                { expiresIn: '7 days' })

            return { user, jwt: jwtToken }
        }
    },

    Query: {
        currentUser(parent, {}, context) {
            if(!context.authorized) throw new GraphQLError('not authorized',
            { extensions: { code: 'UNAUTHORIZED' } })

            return context.currentUser
        }
    }
}