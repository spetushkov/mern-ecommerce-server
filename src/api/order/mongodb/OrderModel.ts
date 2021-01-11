import { model, Schema } from 'mongoose';

const OrderItemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
});

const ShippingAddressSchema = new Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const PayPalPaymentResultSchema = new Schema({
  id: { type: String },
  status: { type: String },
  update_time: { type: String },
  payer: {
    email_address: { type: String },
  },
});

export const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    orderItems: { type: [OrderItemSchema], required: true, default: [] },
    shippingAddress: { type: ShippingAddressSchema, required: true, default: null },
    paymentMethod: {
      type: String,
      enum: ['PayPal', 'Stripe'],
      required: true,
      default: null,
    },
    orderItemsPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    paymentResult: PayPalPaymentResultSchema,
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true },
);

OrderSchema.statics.getExternalKeys = function () {
  return ['user'];
};

export const OrderModel = model('Order', OrderSchema);
