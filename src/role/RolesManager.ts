import { ApplicationRole } from './ApplicationRole';
import { AuthenticatedRole } from './AuthenticatedRole';
import { PublicRole } from './PublicRole';
import { Role } from './Role';

export class RolesManager {
  static create(role: Role): ApplicationRole | null {
    switch (role) {
      case Role.PUBLIC:
        return new PublicRole();
      case Role.AUTHENTICATED:
        return new AuthenticatedRole();
      default:
        return null;
    }
  }
}
