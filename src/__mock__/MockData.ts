import { Logger } from '@spetushkou/api-expressjs';
import { OrderModel } from '../api/order/mongodb/OrderModel';
import { ProductModel } from '../api/product/mongodb/ProductModel';
import { UserModel } from '../api/user/mongodb/UserModel';
import { AppEnvConfig } from '../app/AppEnvConfig';
import { MongoDbStorage } from '../repository/mongodb/MongoDbStorage';
import { MongoDbStorageConnection } from '../repository/mongodb/MongoDbStorageConnection';
import { products } from './json/products';
import { users } from './json/users';

class MockData {
  private mongoDbStorage: MongoDbStorage;

  constructor() {
    new AppEnvConfig();

    this.mongoDbStorage = new MongoDbStorage(new MongoDbStorageConnection());
    this.mongoDbStorage.connect();
  }

  exit(code?: number) {
    this.mongoDbStorage.disconnect();
    process.exit(code);
  }

  async create(): Promise<void> {
    try {
      await OrderModel.deleteMany({});
      await ProductModel.deleteMany({});
      await UserModel.deleteMany({});

      const usersCreated = await UserModel.insertMany(users);
      const productsUpdated = products.map((product) => {
        return { ...product, user: usersCreated[0]._id };
      });
      await ProductModel.insertMany(productsUpdated);

      Logger.log('Mock data created');
    } catch (error) {
      Logger.error(error);
      this.exit(1);
    }
  }

  async delete(): Promise<void> {
    try {
      await OrderModel.deleteMany({});
      await ProductModel.deleteMany({});
      await UserModel.deleteMany({});

      Logger.log('Mock data deleted');
    } catch (error) {
      Logger.error(error);
      this.exit(1);
    }
  }
}

const run = async () => {
  const mockData = new MockData();
  switch (process.argv[2]) {
    case '--create':
      await mockData.create();
      break;
    case '--delete':
      await mockData.delete();
      break;
    default:
      Logger.log('No mock data updated');
      break;
  }
  mockData.exit();
};

run();
