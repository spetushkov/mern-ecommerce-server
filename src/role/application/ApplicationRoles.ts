import { AuthUser, Roles } from '@spetushkou/expressjs';
import { ApiRole } from '../ApiRole';
import { Admin } from './Admin';
import { ApplicationRole } from './ApplicationRole';
import { Author } from './Author';
import { Editor } from './Editor';

type RoleId = keyof typeof ApplicationRole;

export class ApplicationRoles implements Roles {
  private readonly apiRoles: Map<RoleId, ApiRole>;

  constructor() {
    this.apiRoles = new Map();
    this.apiRoles.set('ADMIN', Admin);
    this.apiRoles.set('AUTHOR', Author);
    this.apiRoles.set('EDITOR', Editor);
  }

  get(role: RoleId): ApiRole | undefined {
    return this.apiRoles.get(role);
  }

  includes(role: RoleId, user?: AuthUser): boolean {
    return !user || !user.roles ? false : user.roles.includes(role);
  }
}
