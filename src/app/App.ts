import { ErrorHandler, Logger, Server } from '@spetushkou/api-expressjs';
import 'reflect-metadata';
import { ExpressServer } from '../server/express/ExpressServer';
import { AppContext } from './AppContext';

export const CONTEXT = new AppContext();

export class App {
  private server: Server;

  constructor() {
    this.server = new ExpressServer();
  }

  async start(): Promise<void> {
    try {
      await this.server.start();

      Logger.log('App: started');
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }
}
