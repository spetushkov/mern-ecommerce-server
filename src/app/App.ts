import { ExceptionHandler, Logger } from '@spetushkou/expressjs';
import 'reflect-metadata';
import { Env } from '../env/Env';
import { ApplicationRoles } from '../role/application/ApplicationRoles';
import { Server } from '../server/express/Server';

interface AppContext {
  readonly applicationRoles: ApplicationRoles;
}

export const APP_CONTEXT: AppContext = {
  applicationRoles: new ApplicationRoles(),
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
