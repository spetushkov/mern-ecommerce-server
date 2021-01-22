import { ExceptionHandler, Logger } from '@spetushkou/expressjs';
import 'reflect-metadata';
import { Env } from '../env/Env';
import { ApplicationRolesManager } from '../role/application/ApplicationRolesManager';
import { Server } from '../server/express/Server';

interface AppContext {
  readonly applicationRolesManager: ApplicationRolesManager;
}

export const appContext: AppContext = {
  applicationRolesManager: new ApplicationRolesManager(),
};

export class App {
  private server: Server;

  constructor() {
    new Env();
    this.server = new Server();
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
