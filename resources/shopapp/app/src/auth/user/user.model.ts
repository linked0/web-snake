import mongoose from 'mongoose'
import { UserModel, UserDoc, AuthenticationService } from '@shoppingapp/common'

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.password
        }
    }
})

schema.pre('save', async function(done) {
    const authenticationService = new AuthenticationService()
    if(this.isModified('password') || this.isNew) {
        const hashedPwd = await authenticationService.pwdToHash(this.get('password'));
        this.set('password', hashedPwd);
    }

    done()
})

export const User = mongoose.model<UserDoc, UserModel>('User', schema);