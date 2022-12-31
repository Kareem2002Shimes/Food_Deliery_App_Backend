import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { createProductDto } from 'src/dtos/createProduct.dto';
import { ProductsService } from 'src/products/services/products/products.service';

@Controller('/products')
export class ProductsController {
  //   @Get()
  //   getProducts() {
  //     return ;
  //   }
  constructor(private readonly productsService: ProductsService) {}
  @Post('/create')
  async addProduct(
    @Body()
    productData: createProductDto,
  ) {
    const generatedId = await this.productsService.insertProduct(productData);
    return { id: generatedId };
  }
  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products.map((prod) => ({
      id: prod._id,
      description: prod.description,
      img: prod.img,
      price: prod.price,
    }));
  }
  @Get(':id')
  async getSingleProduct(@Param('id') prodId: string) {
    const product = await this.productsService.getSingleProduct(prodId);
    return {
      id: product._id,
      description: product.description,
      img: product.img,
      price: product.price,
    };
  }
  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('img') prodImg: string,
  ) {
    await this.productsService.updateProduct(
      prodId,
      prodImg,
      prodDesc,
      prodPrice,
      prodTitle,
    );
    return null;
  }
  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
