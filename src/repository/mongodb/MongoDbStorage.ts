import {
  AppException,
  DbStorageConnection,
  Logger,
  StatusCode,
  Storage,
} from '@spetushkou/expressjs';
import mongoose from 'mongoose';

export class MongoDbStorage implements Storage {
  private connection: DbStorageConnection;

  constructor(connection: DbStorageConnection) {
    this.connection = connection;
  }

  async connect(): Promise<void> {
    try {
      if (mongoose.connection.readyState === 1) {
        return Promise.resolve();
      }

      mongoose.connection.on('connected', () => {
        Logger.log(`${this.connection.getConnectionUri()}: connected`);
      });

      mongoose.connection.on('disconnected', () => {
        Logger.log(`${this.connection.getConnectionUri()}: disconnected`);
      });

      mongoose.connection.on('error', (error) => {
        throw new AppException(StatusCode.INTERNAL_SERVER_ERROR, error);
      });

      const connectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        dbName: this.connection.name,
        user: this.connection.user,
        pass: this.connection.userPassword,
      };

      await mongoose.connect(this.connection.host, connectionOptions);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.connection.close();
    } catch (error) {
      Promise.reject(error);
    }
  }
}
