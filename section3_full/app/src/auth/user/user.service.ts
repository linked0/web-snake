import { UserModel } from "@shoppingapp/common";
import { User } from './user.model'
import { AuthDto } from '../dtos/auth.dto'


export class UserService {
    constructor(
        public userModel: UserModel
    ) {}

    async create(createUserDto: AuthDto) {
        const user = new this.userModel({
            email: createUserDto.email,
            password: createUserDto.password
        });

        return await user.save()
    }

    async findOneByEmail(email: string) {
        return await this.userModel.findOne({ email })
    }

}

export const userService = new UserService(User)