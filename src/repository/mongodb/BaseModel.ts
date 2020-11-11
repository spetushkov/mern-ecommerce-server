import { model, Schema } from 'mongoose';

const Document = new Schema(
  {
    createdAt: String,
    createdBy: String,
    updatedAt: String,
    updatedBy: String,
  },
  { timestamps: true },
);

export const BaseModel = model('Document', Document);
