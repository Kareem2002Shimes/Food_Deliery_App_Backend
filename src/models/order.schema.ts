import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    user: {
      id: mongoose.Schema.Types.ObjectId,
      type: String,
      maxlenght: 60,
    },
    address: {
      id: mongoose.Schema.Types.ObjectId,
      type: String,
      maxlenght: 200,
    },
    total: {
      type: Number,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
    },
  },
  { timestamps: true },
);
