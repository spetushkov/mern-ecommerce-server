import { model, Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

UserSchema.statics.getForeignKeys = function () {
  return [];
};

export const UserModel = model('User', UserSchema);
