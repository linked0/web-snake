import { ProductService, productService } from "./product/product.service";
import { CreateProductDto, UpdateProductDto, DeleteProductDto, AddImagesDto, DeleteImagesDto } from './dtos/product.dto'
import { BadRequestError, NotAuthorizedError, } from '@shoppingapp/common'

export class SellerService {
    constructor(
        public productService: ProductService
    ) {}

    async addProduct(createProductDto: CreateProductDto) {
        return await this.productService.create(createProductDto)
    }

    async updateProduct(updateProductDto: UpdateProductDto){
        const product = await this.productService.getOneById(updateProductDto.productId);
        if(!product) return new BadRequestError('product not found!')
        if(product.user.toString() !== updateProductDto.userId){
            return new NotAuthorizedError()
        }

        return await this.productService.updateProduct(updateProductDto);
    }

    async deleteProduct(deleteProductDto: DeleteProductDto) {
        const product = await this.productService.getOneById(deleteProductDto.productId);
        if(!product) return new BadRequestError('product not found!');
        if(product.user.toString() !== deleteProductDto.userId){
            return new NotAuthorizedError()
        }

        return await this.productService.deleteProduct(deleteProductDto)
    }

    async addProductImages(addImagesDto: AddImagesDto) {
        const product = await this.productService.getOneById(addImagesDto.productId);
        if(!product) return new BadRequestError('product not found!');
        if(product.user.toString() !== addImagesDto.userId){
            return new NotAuthorizedError()
        }

        return await this.productService.addImages(addImagesDto)
    }

    async deleteProductImages(deleteImagesDto: DeleteImagesDto) {
        const product = await this.productService.getOneById(deleteImagesDto.productId);
        if(!product) return new BadRequestError('product not found!');
        if(product.user.toString() !== deleteImagesDto.userId){
            return new NotAuthorizedError()
        }

        return await this.productService.deleteImages(deleteImagesDto)
    }
}

export const sellerService = new SellerService(productService)