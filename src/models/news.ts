import { model, Schema, Document } from 'mongoose';

export interface NewsDocument extends Document {
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema = new Schema<NewsDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

newsSchema.index({ title: 'text', description: 'text' });

export const Task = model<NewsDocument>('News', newsSchema);
