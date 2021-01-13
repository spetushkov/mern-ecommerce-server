import { ExceptionHandler, Logger, Server } from '@spetushkou/api-expressjs';
import 'reflect-metadata';
import { ExpressServer } from '../server/express/ExpressServer';
import { AppEnvConfig } from './AppEnvConfig';

export class App {
  private server: Server;

  constructor() {
    new AppEnvConfig();
    this.server = new ExpressServer();
  }

  async start(): Promise<void> {
    try {
      await this.server.start();

      Logger.log('App: started');
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }
}
