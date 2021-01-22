import { BaseCrudController, BaseCrudRoute } from '@spetushkou/expressjs';
import { ConfigEntity } from './ConfigEntity';

export class ConfigRoute extends BaseCrudRoute<ConfigEntity> {
  constructor(constroller: BaseCrudController<ConfigEntity>) {
    super(constroller);
  }

  getBaseUrl(): string {
    return '/configs';
  }
}
