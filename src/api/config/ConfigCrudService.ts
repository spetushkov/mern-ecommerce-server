import { Repository } from '@spetushkou/api-expressjs';
import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { ConfigEntity } from './ConfigEntity';

export class ConfigCrudService extends BaseApiCrudService<ConfigEntity> {
  constructor(repository: Repository<ConfigEntity>) {
    super(repository);
  }
}
