import { ApiRole } from '../ApiRole';

export const Public: ApiRole = {
  order: {
    findAll: false,
    findById: false,
    save: false,
    updateById: false,
    replaceById: false,
    deleteById: false,
  },
  product: {
    findAll: true,
    findById: false,
    save: false,
    updateById: true,
    replaceById: false,
    deleteById: false,
  },
};
