import { classToClass, classToPlain, plainToClass, plainToClassFromExist } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

export type Clazz<T> = ClassType<T>;

export class ClassTransformer {
  static fromPlain<T>(
    entityClass: ClassType<T>,
    entity: Object | null,
    excludeExtraneousValues = true,
  ): T {
    return plainToClass(entityClass, entity, {
      excludeExtraneousValues,
    });
  }

  static toPlain<T>(entity: T): Object {
    return JSON.parse(JSON.stringify(classToPlain(entity)));
  }

  static trimExcluded<T>(entity: T): T {
    const clone = this.clone(entity);
    return plainToClassFromExist(clone, this.toPlain(entity));
  }

  static clone<T>(entity: T): T {
    return classToClass<T>(entity);
  }
}
