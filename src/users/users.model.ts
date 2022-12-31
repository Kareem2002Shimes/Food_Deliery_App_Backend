import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    roles: Array,
  },
  { timestamps: true },
);

export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  roles: [];
  _doc?: any;
}
