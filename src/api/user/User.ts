import { AuthUser } from '@spetushkou/expressjs';
import { ApplicationRole } from '../../role/application/ApplicationRole';

export interface User extends AuthUser {
  name: string;
  email: string;
  password: string;
  roles?: ApplicationRole[];
}
