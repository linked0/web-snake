import mongoose from 'mongoose'
import { UserDoc } from '../auth/user.interfaces';

export interface ProductDoc extends mongoose.Document {
    user: UserDoc | string,
    title: string,
    price: number,
    images: { src: string }[]
}

export interface ProductModel extends mongoose.Model<ProductDoc> {}