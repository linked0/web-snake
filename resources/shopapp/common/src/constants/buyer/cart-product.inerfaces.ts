import mongoose from 'mongoose'
import { CartDoc } from './cart.interfaces'
import { ProductDoc } from '../seller/product.interfaces'

export interface CartProductDoc extends mongoose.Document {
    cart: CartDoc | string;
    product: ProductDoc;
    quantity: number
}

export interface CartProductModel extends mongoose.Model<CartProductDoc> {}