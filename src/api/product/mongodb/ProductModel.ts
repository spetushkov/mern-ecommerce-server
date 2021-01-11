import { model, Schema } from 'mongoose';

export const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0.0 },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0.0 },
    numReviews: { type: Number, required: true, default: 0 },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    reviews: [{ type: Schema.Types.ObjectId, required: true, ref: 'Review' }],
    _reviews: [{ type: Schema.Types.ObjectId, required: true, ref: 'Review' }],
  },
  { timestamps: true },
);

ProductSchema.statics.getForeignKeys = function () {
  return ['user', '_reviews'];
};

export const ProductModel = model('Product', ProductSchema);
