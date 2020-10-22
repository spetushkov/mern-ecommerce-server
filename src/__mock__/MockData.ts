import { Logger } from '@spetushkou/api-expressjs';
import { AppContext } from '../app/AppContext';
import { UserModel } from '../domain/user/mongodb/UserModel';
import { MongoDbStorage } from '../repository/mongodb/MongoDbStorage';
import { MongoDbStorageConnection } from '../repository/mongodb/MongoDbStorageConnection';
import { users } from './json/users';

class MockData {
  static async create(): Promise<void> {
    new AppContext();

    const mongoDbStorage = new MongoDbStorage(new MongoDbStorageConnection());
    mongoDbStorage.connect();

    try {
      await UserModel.deleteMany({});
      await UserModel.insertMany(users);

      Logger.log('Mock data created');
      mongoDbStorage.disconnect();
      process.exit();
    } catch (error) {
      mongoDbStorage.disconnect();
      Logger.error(error);
      process.exit(1);
    }
  }

  static async delete(): Promise<void> {
    new AppContext();

    const mongoDbStorage = new MongoDbStorage(new MongoDbStorageConnection());
    mongoDbStorage.connect();

    try {
      await UserModel.deleteMany({});

      Logger.log('Mock data deleted');
      mongoDbStorage.disconnect();
      process.exit();
    } catch (error) {
      mongoDbStorage.disconnect();
      Logger.error(error);
      process.exit(1);
    }
  }
}

switch (process.argv[2]) {
  case '--create':
    MockData.create();
    break;
  case '--delete':
    MockData.delete();
    break;
  default:
    Logger.log('No mock data updated');
    break;
}
