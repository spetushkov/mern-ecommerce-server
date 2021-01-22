import {
  AppException,
  CookieParser,
  Cors,
  DbStorageConnection,
  ExceptionHandler,
  HttpLogger,
  JsonParser,
  Logger,
  ResponseHeaders,
  ServerExceptionHandler,
  StaticFolderRegister,
  StatusCode,
  UrlEncoder,
} from '@spetushkou/expressjs';
import express, { Application } from 'express';
import { EnvUtils } from '../../env/EnvUtils';
import { MongoDbStorageConnection } from '../../repository/mongodb/MongoDbStorageConnection';
import { Routes } from './Routes';
import { Storages } from './Storages';

export class Server {
  private name: string;
  private port: number;
  private app: Application;
  private storageConnection: DbStorageConnection;
  private storages: Storages;
  private routes: Routes;
  private fileUploadsPath: string;

  constructor() {
    this.app = express();
    this.name = 'Express server';
    this.port = Number(process.env.PORT) || 3000;
    this.fileUploadsPath = EnvUtils.getFileUploadsPath();

    this.storageConnection = new MongoDbStorageConnection();
    this.storages = new Storages(this.storageConnection);
    this.routes = new Routes(this.app);

    try {
      this.app.use(
        ResponseHeaders(
          process.env.ACCESS_CONTROL_ALLOW_ORIGIN || '*',
          process.env.ACCESS_CONTROL_ALLOW_HEADERS || '',
          process.env.ACCESS_CONTROL_ALLOW_METHODS || '',
        ),
      );
      this.app.use(JsonParser());
      this.app.use(UrlEncoder());
      this.app.use(CookieParser());
      this.app.use(Cors());
      if (process.env.NODE_ENV === 'development') {
        this.app.use(HttpLogger());
      }
      this.app.use(this.fileUploadsPath, StaticFolderRegister(this.fileUploadsPath));

      this.routes.connect();

      this.onStop();

      this.app.use(ServerExceptionHandler);
    } catch (error) {
      const appError = new AppException(StatusCode.INTERNAL_SERVER_ERROR, error.message);
      ExceptionHandler.handle(appError);
    }
  }

  async start(): Promise<void> {
    try {
      const { ENV_NAME } = process.env;
      this.app.listen(this.port, () => {
        Logger.log(`${this.name}: started on port ${this.port} in mode ${ENV_NAME}`);
      });

      await this.storages.connect();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private onStop() {
    process.on('SIGINT', async () => {
      try {
        await this.storages.disconnect();

        Logger.log(`${this.name}: stopped`);
        process.exit(0);
      } catch (error) {
        return Promise.reject(error);
      }
    });
  }
}
