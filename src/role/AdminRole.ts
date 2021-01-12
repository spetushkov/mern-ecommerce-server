import { AuthenticatedRole } from './system/AuthenticatedRole';

export const AdminRole = {
  ...AuthenticatedRole,
  product: {
    ...AuthenticatedRole.product,
    findAll: true,
  },
};
