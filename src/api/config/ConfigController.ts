import { CrudService } from '@spetushkou/expressjs';
import { BaseApiCrudController } from '../../controller/BaseApiCrudController';
import { ConfigEntity } from './ConfigEntity';

export class ConfigController extends BaseApiCrudController<ConfigEntity> {
  constructor(service: CrudService<ConfigEntity>) {
    super(service, ConfigEntity);
  }
}
