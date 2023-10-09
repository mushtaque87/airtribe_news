import { model, Schema, Document } from 'mongoose';

export interface PreferenceDocument extends Document {
  userId: string;
  preference: string;
}

const preferenceSchema = new Schema<PreferenceDocument>({
  userId: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  preference: {
    type: String,
    required: true,
    trim: true,
  },
});

preferenceSchema.index({ title: 'text', description: 'text' });

export const Preferences = model<PreferenceDocument>(
  'Preference',
  preferenceSchema,
);
