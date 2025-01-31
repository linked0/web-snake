import { UserService, userService } from './user/user.service'
import { AuthDto } from './dtos/auth.dto'
import { NextFunction } from 'express';
import { BadRequestError, AuthenticationService } from '@shoppingapp/common'

export class AuthService {
    constructor(
        public userService: UserService,
        public authenticationService: AuthenticationService
    ) {}

    async signup(createUserDto: AuthDto ) {
        const existingUser = await this.userService.findOneByEmail(createUserDto.email)
        if(existingUser) return { message: "email is taken"  }

        const newUser = await this.userService.create(createUserDto);
        
        const jwt = this.authenticationService.generateJwt({ email: createUserDto.email, userId: newUser.id }, process.env.JWT_KEY!);
        
        return {jwt};
    }

    async signin(signinDto: AuthDto) {
        const user = await this.userService.findOneByEmail(signinDto.email);
        if(!user) return { message: "wrong credentials" }

        const samePwd = this.authenticationService.pwdCompare(user.password, signinDto.password);

        if(!samePwd) return { message: "wrong credentials" }

        const jwt = this.authenticationService.generateJwt({ email: user.email, userId: user.id }, process.env.JWT_KEY!);        
        
        return {jwt}
    }
}

export const authService = new AuthService(userService, new AuthenticationService())
