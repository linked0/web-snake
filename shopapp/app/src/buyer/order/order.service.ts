import { OrderModel } from '@shoppingapp/common'
import { Order } from './order.model'
import { CreateOrderDto } from '../dtos/order.dto'

export class OrderService {
    constructor(
        public orderModel: OrderModel
    ) {}

    async createOrder(createOrderDto: CreateOrderDto) {
        const order = new this.orderModel({
            user: createOrderDto.userId,
            totalAmount: createOrderDto.totalAmount,
            chargeId: createOrderDto.chargeId
        })

        return await order.save()
    }
}

export const orderService =  new OrderService(Order)