import { BaseApiEntity } from '../../entity/BaseApiEntity';
import { ApplicationRole } from '../../role/application/ApplicationRole';

export interface User extends BaseApiEntity {
  name: string;
  email: string;
  password: string;
  roles?: ApplicationRole[];
}
