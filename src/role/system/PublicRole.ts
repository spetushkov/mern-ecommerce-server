import { ApiRole } from '../ApiRole';

export const PublicRole: ApiRole = {
  order: {
    findAll: false,
    findById: false,
    save: false,
    updateById: false,
    replaceById: false,
    deleteById: false,
  },
  product: {
    findAll: false,
    findById: false,
    save: false,
    updateById: false,
    replaceById: false,
    deleteById: false,
  },
};
