import { CrudService } from '@spetushkou/api-expressjs';
import { BaseDomainCrudController } from '../../server/express/controller/BaseDomainCrudController';
import { ConfigEntity } from './ConfigEntity';

export class ConfigCrudController extends BaseDomainCrudController<ConfigEntity> {
  constructor(service: CrudService<ConfigEntity>) {
    super(service, ConfigEntity);
  }
}
