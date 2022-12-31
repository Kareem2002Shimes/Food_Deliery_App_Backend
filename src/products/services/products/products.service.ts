import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
  async insertProduct({ title, price, description, img }: Product) {
    const newProduct = new this.productModel({
      title,
      price,
      description,
      img,
    });
    const result = await newProduct.save();
    return result._id as string;
  }
  async getProducts() {
    const products = await this.productModel.find().exec();
    return products as Product[];
  }
  async getSingleProduct(prodId: string) {
    const product = await this.findProduct(prodId);
    return product;
  }
  async updateProduct(
    prodId: string,
    prodImg: string,
    prodDesc: string,
    prodPrice: number,
    prodTitle: string,
  ) {
    const updatedproduct = await this.findProduct(prodId);

    if (prodTitle) {
      updatedproduct.title = prodTitle;
    }
    if (prodPrice) {
      updatedproduct.price = prodPrice;
    }
    if (prodDesc) {
      updatedproduct.description = prodDesc;
    }
    if (prodImg) {
      updatedproduct.img = prodImg;
    }
    updatedproduct.save();
  }
  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }
  private async findProduct(id: string): Promise<Product> {
    let product: Product | PromiseLike<Product>;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }

    return product;
  }
}
