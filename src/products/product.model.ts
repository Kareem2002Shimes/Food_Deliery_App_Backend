import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      maxlenght: 60,
      required: true,
    },
    description: {
      type: String,
      maxlenght: 200,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
  },
  { timestamps: true },
);

export interface Product extends mongoose.Document {
  _id: string;
  title: string;
  description: string;
  price: number;
  img: string;
}
