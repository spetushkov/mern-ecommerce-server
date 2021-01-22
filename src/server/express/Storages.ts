import { DbStorageConnection, Storage } from '@spetushkou/expressjs';
import { MongoDbStorage } from '../../repository/mongodb/MongoDbStorage';

export class Storages {
  private storages: Storage[] = [];
  private mongoDbStorage: Storage;

  constructor(connection: DbStorageConnection) {
    this.mongoDbStorage = new MongoDbStorage(connection);
    this.register(this.mongoDbStorage);
  }

  private register(storage: Storage) {
    this.storages.push(storage);
  }

  async connect(): Promise<void> {
    try {
      for (const storage of this.storages) {
        await storage.connect();
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      for (const storage of this.storages) {
        await storage.disconnect();
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
