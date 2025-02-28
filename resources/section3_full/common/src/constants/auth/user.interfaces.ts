import mongoose from 'mongoose'

export interface UserDoc extends mongoose.Document {
    email: string,
    password: string,
}

export interface UserModel extends mongoose.Model<UserDoc> {}