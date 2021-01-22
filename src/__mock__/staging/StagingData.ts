import { Logger } from '@spetushkou/expressjs';
import { OrderModel } from '../../api/order/mongodb/OrderModel';
import { ProductModel } from '../../api/product/mongodb/ProductModel';
import { ReviewModel } from '../../api/review/mongodb/ReviewModel';
import { UserModel } from '../../api/user/mongodb/UserModel';
import { Env } from '../../env/Env';
import { MongoDbStorage } from '../../repository/mongodb/MongoDbStorage';
import { MongoDbStorageConnection } from '../../repository/mongodb/MongoDbStorageConnection';
import { products } from './json/products';
import { users } from './json/users';

class StagingData {
  private mongoDbStorage: MongoDbStorage;

  constructor() {
    new Env();

    this.mongoDbStorage = new MongoDbStorage(new MongoDbStorageConnection());
    this.mongoDbStorage.connect();
  }

  exit(code?: number) {
    this.mongoDbStorage.disconnect();
    process.exit(code);
  }

  async create(): Promise<void> {
    try {
      await this.deleteCollections();

      const usersCreated = await UserModel.insertMany(users);
      const productsUpdated = products.map((product) => {
        return { ...product, user: usersCreated[0]._id };
      });
      await ProductModel.insertMany(productsUpdated);

      Logger.log('Staging data created');
    } catch (error) {
      Logger.error(error);
      this.exit(1);
    }
  }

  async delete(): Promise<void> {
    try {
      await this.deleteCollections();

      Logger.log('Staging data deleted');
    } catch (error) {
      Logger.error(error);
      this.exit(1);
    }
  }

  private async deleteCollections() {
    try {
      await OrderModel.deleteMany({});
      await ProductModel.deleteMany({});
      await ReviewModel.deleteMany({});
      await UserModel.deleteMany({});
    } catch (error) {
      Logger.error(error);
      this.exit(1);
    }
  }
}

const run = async () => {
  const mockData = new StagingData();
  switch (process.argv[2]) {
    case '--create':
      await mockData.create();
      break;
    case '--delete':
      await mockData.delete();
      break;
    default:
      Logger.log('No staging data updated');
      break;
  }
  mockData.exit();
};

run();
