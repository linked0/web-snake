import { CartModel, CartProductModel, ProductDoc } from "@shoppingapp/common";
import { CartProduct } from "./cart-product.model";
import { Cart } from "./cart.model";
import { AddProductToCartDto, CreateCartProductDto, RemoveProductFromCartDto, UpdateCartProductQuantityDto } from '../dtos/cart.dto'

export class CartService {
    constructor(
        public cartModel: CartModel,
        public cartProductModel: CartProductModel
    ) {}

    async findOneByUserId(userId: string) {
        return await this.cartModel.findOne({ user: userId })
    }

    async getCartProductById(productId: string, cartId: string) {
        return await this.cartProductModel.findOne({ product: productId, cart: cartId })
    }

    async createCart(userId: string) {
        const cart = new this.cartModel({
            user: userId
        });

        return await cart.save()
    }

    async createCartProduct(createCartProductDto: CreateCartProductDto) {
        const cartProduct = new this.cartProductModel({
            cart: createCartProductDto.cartId,
            product: createCartProductDto.productId,
            quantity: createCartProductDto.quantity,
        })

        return await cartProduct.save()
    }

    async isProductInCart(cartId: string, productId: string) {
        return  !!(await this.cartProductModel.findOne({ cartId, product: productId }))
    }

    async getCart(cartId: string) {
        return await this.cartModel.findOne({ _id: cartId })
    }

    async clearCart(userId: string, cartId: string) {
        return await this.cartModel.findOneAndUpdate({ _id: cartId, user: userId }, 
            { $set: { products: [], totalPrice: 0 } }, { new: true })
    }

    async removeProductFromCart(removeProductFromCartDto: RemoveProductFromCartDto) {
        const { cartId, productId } = removeProductFromCartDto;
        const cartProduct = await this.cartProductModel.findOne({ product: productId }).populate('product');
        if(!cartProduct) return null;

        const deletedDoc = await this.cartProductModel.findOneAndRemove({ _id: cartProduct._id });
        if(!deletedDoc) return null;

        return await this.cartModel.findOneAndUpdate({ _id: cartId }, 
            { $pull: { products: cartProduct._id }, 
            $inc: { totalPrice: -(cartProduct.product.price * cartProduct.quantity) } }, { new: true })
    }

    async updateProductQuantity(updateCartProductQuantityDto: UpdateCartProductQuantityDto) {
        const { inc, amount } = updateCartProductQuantityDto.options;
        const { productId, cartId } = updateCartProductQuantityDto;
        const cartProduct = await this.cartProductModel.findOne({ product: productId })
        if(!cartProduct) return null;

        if(cartProduct.quantity < amount && !inc) {
            return await this.removeProductFromCart({ cartId, productId })
        }

        const updatedCartProduct = await this.cartProductModel.findOneAndUpdate({_id: cartProduct._id},
            { $inc: { quantity: inc ? amount : -amount } }, { new: true }).populate('product')
        
        const newPrice = inc ? updatedCartProduct!.product.price * amount 
                            : -(updatedCartProduct!.product.price * amount)
        return await this.cartModel.findOneAndUpdate({ _id: cartId },
             { $inc: { totalPrice: newPrice } }, { new: true })
        
    }

    async addProduct(addProductToCartDto: AddProductToCartDto, product:ProductDoc ) {
        const { userId, quantity, productId } = addProductToCartDto;
        let cart = await this.findOneByUserId(userId);

        // if the product in cart => quantity += 1
        const isProductInCart = cart && await this.isProductInCart(cart._id, productId)

        if(isProductInCart && cart) return this.updateProductQuantity({cartId: cart._id, productId, options: { inc: true, amount: quantity }})

        if(!cart) cart = await this.createCart(userId);

        const cartProduct = await this.createCartProduct({ cartId: cart._id, productId, quantity })
        
        return await this.cartModel.findOneAndUpdate({ _id: cart._id }, 
            { $push: { products: cartProduct }, $inc: { totalPrice: product.price * quantity } }, { new: true })

    }
}

export const cartService = new CartService(Cart, CartProduct)