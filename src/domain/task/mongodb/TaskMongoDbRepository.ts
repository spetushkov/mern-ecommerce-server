import { BaseMongoDbRepository, MongoDbResult } from '@spetushkou/api-expressjs';
import { Document } from 'mongoose';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { Task } from '../Task';
import { Task as TaskSchema } from './Task';
import { TaskModel } from './TaskModel';

export class TaskMongoDbRepository extends BaseMongoDbRepository<Task> {
  constructor() {
    super(TaskModel);
  }

  protected async postSave(doc: Document): Promise<Document> {
    try {
      const keys = TaskSchema.statics.getExternalKeys();
      for (const key of keys) {
        await doc.populate(key).execPopulate();
      }
      return doc;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected normalize(dbResult: MongoDbResult | null): Task | Task[] {
    return ClassTransformer.trimExcluded(ClassTransformer.fromPlain(Task, dbResult));
  }
}
