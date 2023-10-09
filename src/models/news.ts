import { model, Schema, Document } from 'mongoose';

export interface NewsDocument extends Document {
  userId: string;
  title: string;
  description: string;
  status: string;
  url: string;
  urlToImage: string;
  createdAt: Date;
  publishedAt: Date;
}

const newsSchema = new Schema<NewsDocument>(
  {
    userId: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
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
      required: false,
      trim: true,
    },
    url: {
      type: String,
      required: false,
      trim: true,
    },
    urlToImage: {
      type: String,
      required: false,
      trim: true,
    },
    publishedAt: {
      type: Date,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

newsSchema.index({ title: 'text', description: 'text' });

export const News = model<NewsDocument>('News', newsSchema);
