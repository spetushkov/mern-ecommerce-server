import { model, Schema } from 'mongoose';

export const ReviewSchema = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, default: 0.0 },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);

ReviewSchema.statics.getExternalKeys = function () {
  return [];
};

export const ReviewModel = model('Review', ReviewSchema);
