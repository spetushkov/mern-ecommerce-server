import { ExceptionHandler, Logger, Server } from '@spetushkou/expressjs';
import 'reflect-metadata';
import { Env } from '../env/Env';
import { ApplicationRolesManager } from '../role/application/ApplicationRolesManager';
import { ExpressServer } from '../server/express/ExpressServer';

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
