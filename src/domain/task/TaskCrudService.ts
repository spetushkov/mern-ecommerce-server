import { BaseCrudService, Repository } from '@spetushkou/api-expressjs';
import { Task } from './Task';

export class TaskCrudService extends BaseCrudService<Task> {
  constructor(repository: Repository<Task>) {
    super(repository);
  }

  protected getCreatedBy(entity: Task): string | undefined {
    return entity.userId;
  }

  protected getUpdatedBy(entity: Task): string | undefined {
    return entity.userId;
  }
}
