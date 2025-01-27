import mongoose from 'mongoose'
import { authenticationService } from '../common'
import { ArticleDoc } from './article'

export interface UserDoc extends mongoose.Document {
    email: string,
    password: string,
    articles: Array<ArticleDoc>
}
export interface CreateUserDto {
    email: string,
    password: string
}
export interface UserModel extends mongoose.Model<UserDoc> {
    build(edto: CreateUserDto): UserDoc
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article'
        }
    ]
})
userSchema.pre('save', async function (done) {
    if (!this.isModified('password') || this.isNew) {
        const hassedPwd = authenticationService.pwdToHash(this.get('password'))
        this.set('password', hassedPwd)
    }
    done()
})

userSchema.statics.build = (createUserDto: CreateUserDto) => {
    return new User(createUserDto)
} 

export const User = mongoose.model<UserDoc, UserModel>('User', userSchema)
