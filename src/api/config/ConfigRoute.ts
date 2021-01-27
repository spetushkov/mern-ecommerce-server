import { BaseCrudController, BaseCrudRoute } from '@spetushkou/expressjs';
import { ConfigEntity } from './ConfigEntity';

export class ConfigRoute extends BaseCrudRoute<ConfigEntity> {
  constructor(controller: BaseCrudController<ConfigEntity>) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/configs';
  }
}
