import { AuthUser, RolesManager } from '@spetushkou/api-expressjs';
import { ApiRole } from '../ApiRole';
import { Admin } from './Admin';
import { ApplicationRole } from './ApplicationRole';
import { Author } from './Author';
import { Editor } from './Editor';

export class ApplicationRolesManager implements RolesManager {
  get(role: keyof typeof ApplicationRole): ApiRole | null {
    switch (role) {
      case 'ADMIN':
        return Admin;
      case 'AUTHOR':
        return Author;
      case 'EDITOR':
        return Editor;
      default:
        return null;
    }
  }

  includes(role: keyof typeof ApplicationRole, user?: AuthUser): boolean {
    return !user || !user.roles ? false : user.roles.includes(role);
  }
}
