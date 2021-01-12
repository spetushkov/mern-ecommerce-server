import { AdminRole } from './AdminRole';
import { ApiRole } from './ApiRole';
import { ApplicationRole } from './ApplicationRole';
import { AuthenticatedRole } from './system/AuthenticatedRole';
import { PublicRole } from './system/PublicRole';
import { SystemRole } from './system/SystemRole';

export class RolesManager {
  static create(role: keyof typeof SystemRole | keyof typeof ApplicationRole): ApiRole | null {
    switch (role) {
      case 'PUBLIC':
        return PublicRole;
      case 'AUTHENTICATED':
        return AuthenticatedRole;
      case 'ADMIN':
        return AdminRole;
      default:
        return null;
    }
  }
}
