import { Authenticated } from '../default/Authenticated';

export const Author = {
  ...Authenticated,
  product: {
    ...Authenticated.product,
    updateById: false,
  },
};
