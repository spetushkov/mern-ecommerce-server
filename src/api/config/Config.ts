import { BaseApiEntity } from '../../entity/BaseApiEntity';

export interface Config extends BaseApiEntity {
  payPalClientId?: string;
}
