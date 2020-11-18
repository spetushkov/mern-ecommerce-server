import { Repository } from '@spetushkou/api-expressjs';
import { BaseDomainCrudService } from '../../service/BaseDomainCrudService';
import { ConfigEntity } from './ConfigEntity';

export class ConfigCrudService extends BaseDomainCrudService<ConfigEntity> {
  constructor(repository: Repository<ConfigEntity>) {
    super(repository);
  }
}
