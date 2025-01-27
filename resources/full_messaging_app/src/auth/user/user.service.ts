import { In, Repository } from 'typeorm'
import { User } from './entity/user.entity'
import { SignupInput } from '../../__generated__/resolvers-types'
import bcrypt from 'bcrypt'
import { AppDataSource } from '../../app-data.source'
import { validateOrReject, ValidationError } from 'class-validator'
import { GraphQLError } from 'graphql'

export class UserService {
    constructor(public userRepository: Repository<User> ) {}
 
    async create(signupInput: SignupInput) {
       
        const user = this.userRepository.create(signupInput);

        return await validateOrReject(user).then(async () => {
            const password = await bcrypt.hash(signupInput.password, 10)
            user.password = password

            return await this.userRepository.save(user)
        })
        .catch((errors: ValidationError[]) => {
            throw new GraphQLError('validation error', {
                extensions: {
                    errors,
                    code: 'BAD_USER_INPUT'
                }
            })
        })
    }

    async findOneByEmail(email: string) {
        // only if entity.column({ select: false })
        const user = await this.userRepository.createQueryBuilder('user')
        .select('user')
        .addSelect('user.password')
        .where('email = :email', { email }).getOne()

        return user
    }

    async findByIds(ids: Array<number>) {
        return await this.userRepository.findBy({ id: In(ids) })
    }
}

export const userService = new UserService(AppDataSource.getRepository(User))