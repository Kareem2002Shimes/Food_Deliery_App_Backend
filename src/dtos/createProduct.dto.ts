import mongoose from 'mongoose';

export class createProductDto extends mongoose.Document {
  _id: string;
  title: string;
  description: string;
  price: number;
  img: string;
}
