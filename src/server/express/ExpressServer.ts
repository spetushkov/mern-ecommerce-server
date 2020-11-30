import {
  AppException,
  CookieParser,
  Cors,
  DbStorageConnection,
  ErrorHandler,
  HttpLogger,
  JsonParser,
  Logger,
  Server,
  ServerErrorHandler,
  StatusCode,
  UrlEncoder,
} from '@spetushkou/api-expressjs';
import express, { Application } from 'express';
import { MongoDbStorageConnection } from '../../repository/mongodb/MongoDbStorageConnection';
import { EnvUtils } from '../../utils/EnvUtils';
import { ResponseHeaders } from './middleware/ResponseHeaders';
import { StaticFolderRegister } from './middleware/StaticFolderRegister';
import { RoutesManager } from './RoutesManager';
import { StoragesManager } from './StoragesManager';

export class ExpressServer implements Server {
  private name: string;
  private port: number;
  private app: Application;
  private storageConnection: DbStorageConnection;
  private storagesManager: StoragesManager;
  private routesManager: RoutesManager;
  private fileUploadsPath: string;

  constructor() {
    this.app = express();
    this.name = 'Express server';
    this.port = Number(process.env.PORT) || 3000;
    this.fileUploadsPath = EnvUtils.getFileUploadsPath2();

    this.storageConnection = new MongoDbStorageConnection();
    this.storagesManager = new StoragesManager(this.storageConnection);
    this.routesManager = new RoutesManager(this.app);

    try {
      this.app.use(ResponseHeaders);
      this.app.use(JsonParser());
      this.app.use(UrlEncoder());
      this.app.use(CookieParser());
      this.app.use(Cors());
      this.app.use(HttpLogger());
      this.app.use(this.fileUploadsPath, StaticFolderRegister(this.fileUploadsPath));

      this.routesManager.connect();

      this.onStop();

      this.app.use(ServerErrorHandler);
    } catch (error) {
      const appError = new AppException(StatusCode.INTERNAL_SERVER_ERROR, error.message);
      ErrorHandler.handle(appError);
    }
  }

  async start(): Promise<void> {
    try {
      const { ENV_NAME } = process.env;
      this.app.listen(this.port, () => {
        Logger.log(`${this.name}: started on port ${this.port} in mode ${ENV_NAME}`);
      });

      await this.storagesManager.connect();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private onStop() {
    process.on('SIGINT', async () => {
      try {
        await this.storagesManager.disconnect();

        Logger.log(`${this.name}: stopped`);
        process.exit(0);
      } catch (error) {
        return Promise.reject(error);
      }
    });
  }
}
