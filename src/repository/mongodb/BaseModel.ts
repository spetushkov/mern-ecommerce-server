import { model, Schema } from 'mongoose';

const Document = new Schema(
  {
    createdAtIso: String,
    createdBy: String,
    updateAtIso: String,
    updatedBy: String,
  },
  {
    timestamps: true,
  },
);

export const BaseModel = model('Document', Document);
