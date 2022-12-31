import * as mongoose from 'mongoose';

export const RestaurantSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: true,
      maxlenght: 60,
    },
    products: {
      type: [String],
      required: true,
      maxlenght: 200,
    },
    rating: Number,
    img: {
      type: String,
      required: true,
    },
    info: {
      deliveryTime: Number,
      deliveryFees: Number,
      minOrder: Number,
    },
  },
  { timestamps: true },
);
