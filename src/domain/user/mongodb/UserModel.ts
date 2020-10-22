import { model } from 'mongoose';
import { User } from './User';

export const UserModel = model('User', User);
