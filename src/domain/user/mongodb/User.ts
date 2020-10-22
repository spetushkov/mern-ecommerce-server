import { Schema } from 'mongoose';
import { Profile } from '../../profile/mongodb/Profile';

export const User = new Schema({
  name: String,
  email: String,
  password: String,
  roles: [String],
  description: String,
  notes: String,
  isActive: Boolean,
  age: Number,
  imageUri: String,
  address: {
    country: String,
    city: String,
    street: String,
    building: Number,
    apartment: Number,
    isEU: Boolean,
    labels: [String],
  },
  registrationDate: Date,
  enrollmentDate: Date,
  isRegistered: Boolean,
  registrationCount: Number,
  registrationFirstName: String,
  registrationLastName: String,
  profile: Profile, // reference (embedded doc): user ONE_TO_ONE profile
});

User.statics.getExternalKeys = function () {
  return [];
};
