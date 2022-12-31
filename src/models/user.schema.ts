import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  phoneNum: Number,
  address: {
    id: mongoose.Schema.Types.ObjectId,
    addr1: String,
    addr2: String,
    city: String,
    region: String,
    zip: Number,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});
