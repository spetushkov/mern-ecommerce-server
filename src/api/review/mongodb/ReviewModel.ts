import { model, Schema } from 'mongoose';

export const ReviewSchema = new Schema(
  {
    name: { type: String },
    rating: { type: Number, required: true, default: 0.0 },
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    product: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  },
  { timestamps: true },
);

ReviewSchema.statics.getForeignKeys = function () {
  return [];
};

export const ReviewModel = model('Review', ReviewSchema);
