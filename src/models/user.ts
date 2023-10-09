import { ROLE } from '../utils/types';

import mongoose, { model, Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: ROLE;
}

const userSchema = new Schema<UserDocument>(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: [ROLE.USER, ROLE.ADMIN],
      required: [true, 'Please specify user role'],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

//userSchema.index({ title: 'text', description: 'text' });

export const User = model<UserDocument>('User', userSchema);
