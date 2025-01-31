import mongoose from "mongoose";
import { authenticationService } from "../../common";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    article: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article'
        } 
    ]
});

userSchema.pre('save', async function(done) {
    if(this.isModified('password') || this.isNew) {
        const hashedPwd = await authenticationService.pwdToHash(this.get('password'));
        this.set('password', hashedPwd)
    }

    done()
});

export const User = mongoose.model('User', userSchema);