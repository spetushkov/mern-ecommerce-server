import { BaseDomain } from './BaseDomain';

export interface User extends BaseDomain {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}
