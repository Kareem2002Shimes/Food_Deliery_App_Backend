import { Module } from '@nestjs/common';
import { ProductSchema } from './product.model';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/products.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
