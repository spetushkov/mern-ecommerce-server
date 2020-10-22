import { BaseCrudController, BaseRequest, CrudService } from '@spetushkou/api-expressjs';
import { ClassTransformer } from '../../class/ClassTransformer';
import { Task } from './Task';
import { TaskQuery } from './TaskQuery';

export class TaskCrudController extends BaseCrudController<Task> {
  constructor(service: CrudService<Task>) {
    super(service);
  }

  protected preSave(req: BaseRequest, entity: Task): Task {
    const entityUpdated = this.resolveUserId(req, entity);
    entityUpdated.author = entityUpdated.userId; // reference to a user object
    return entityUpdated;
  }

  protected preUpdate(req: BaseRequest, entity: Task): Task {
    return this.resolveUserId(req, entity);
  }

  private resolveUserId(req: BaseRequest, entity: Task): Task {
    const { user } = req;
    if (!user) {
      return entity;
    }

    const entityUpdated = ClassTransformer.clone(entity);
    entityUpdated.userId = user.id;

    return entityUpdated;
  }

  protected fromPlain(entity: Object | null): Task {
    return ClassTransformer.fromPlain(Task, entity);
  }

  protected fromQueryPlain(entity: Object | null): Partial<Task> {
    return ClassTransformer.fromPlain(TaskQuery, entity);
  }
}
