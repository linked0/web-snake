export interface CreateOrderDto {
    userId: string;
    totalAmount: number;
    chargeId: number | string
}
