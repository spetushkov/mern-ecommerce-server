import { ApiEntity } from '@spetushkou/expressjs';

export interface Config extends ApiEntity {
  payPalClientId?: string;
}
