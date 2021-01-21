import { Authenticated } from '../default/Authenticated';

export const Admin = {
  ...Authenticated,
  product: {
    ...Authenticated.product,
    updateById: true,
  },
};
