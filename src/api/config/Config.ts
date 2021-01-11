import { ApiEntity } from '../../entity/ApiEntity';

export interface Config extends ApiEntity {
  payPalClientId?: string;
}
