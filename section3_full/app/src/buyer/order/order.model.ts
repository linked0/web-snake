import mongoose from 'mongoose'
import { OrderDoc, OrderModel } from '@shoppingapp/common'

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalAmount: { type: Number, required: true },

    chargeId: { type: String, required: true }
})

export const Order = mongoose.model<OrderDoc, OrderModel>('Order', schema);