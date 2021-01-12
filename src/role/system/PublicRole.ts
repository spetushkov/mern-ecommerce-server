import { ApiRole } from '../ApiRole';

export const PublicRole: ApiRole = {
  order: {
    findAll: false,
    findById: false,
    save: false,
    updateById: false,
    replaceById: false,
    deleteById: false,
    orderSend: false,
  },
  product: {
    findAll: true,
    findById: false,
    save: false,
    updateById: false,
    replaceById: false,
    deleteById: false,
    productPublish: false,
  },
};
