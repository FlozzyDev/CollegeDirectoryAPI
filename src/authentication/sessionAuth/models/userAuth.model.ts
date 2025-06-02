import mongoose, { Schema, Document } from 'mongoose';
import { IUserAuth } from '../types/userAuth.types.js';

const userAuthSchema = new Schema<IUserAuth & Document>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<IUserAuth>('User', userAuthSchema);
export default User;
