import { DbStorageConnection } from '@spetushkou/api-expressjs';

export class MongoDbStorageConnection implements DbStorageConnection {
  host: string;
  name: string;
  user: string;
  userPassword: string;

  constructor() {
    const {
      MONGODB_HOST = '',
      MONGODB_NAME = '',
      MONGODB_USER = '',
      MONGODB_USER_PASSWORD = '',
    } = process.env;

    this.host = MONGODB_HOST;
    this.name = MONGODB_NAME;
    this.user = MONGODB_USER;
    this.userPassword = MONGODB_USER_PASSWORD;
  }

  getConnectionUri(): string {
    return `${this.host}/${this.name}`;
  }
}
