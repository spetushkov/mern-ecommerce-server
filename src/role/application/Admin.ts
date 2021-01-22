import { Authenticated } from '../default/Authenticated';

export const Admin = {
  ...Authenticated,
  product: {
    ...Authenticated.product,
    save: true,
    updateById: true,
    deleteById: true,
  },
};
