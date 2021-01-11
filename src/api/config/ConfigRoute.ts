import { BaseCrudController, BaseCrudRoute } from '@spetushkou/api-expressjs';
import { ConfigEntity } from './ConfigEntity';

export class ConfigRoute extends BaseCrudRoute<ConfigEntity> {
  constructor(constroller: BaseCrudController<ConfigEntity>) {
    super(constroller);
  }

  getBaseUrl(): string {
    return '/configs';
  }
}
