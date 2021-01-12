import { AdminRole } from './AdminRole';
import { ApiRole } from './ApiRole';
import { ApplicationRole } from './ApplicationRole';

export class RolesManager {
  static get(role: keyof typeof ApplicationRole): ApiRole | null {
    switch (role) {
      case 'ADMIN':
        return AdminRole;
      default:
        return null;
    }
  }
}
