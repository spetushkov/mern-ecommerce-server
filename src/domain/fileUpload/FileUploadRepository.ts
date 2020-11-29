import { PageRequest, PageResult, Repository, ServerException } from '@spetushkou/api-expressjs';
import { FileUploadEntity } from './FileUploadEntity';

export class FileUploadRepository implements Repository<FileUploadEntity> {
  async findAll(pageRequest: PageRequest): Promise<PageResult<FileUploadEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<FileUploadEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: Object): Promise<FileUploadEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: FileUploadEntity): Promise<FileUploadEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(id: string, query: Object): Promise<FileUploadEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<FileUploadEntity> {
    throw ServerException.NotImplementedException();
  }

  // private normalize(entity: Object | null): FileUploadEntity {
  //   const resultNotExcluded = ClassTransformer.fromPlain(FileUploadEntity, entity, false);
  //   return ClassTransformer.fromPlain(FileUploadEntity, resultNotExcluded, true);
  // }
}
