import { Authenticated } from '../default/Authenticated';

export const Editor = {
  ...Authenticated,
  product: {
    ...Authenticated.product,
    updateById: true,
  },
};
