import { AuthController, BaseAuthRoute } from '@spetushkou/api-expressjs';

export class JwtAuthRoute extends BaseAuthRoute {
  constructor(controller: AuthController) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/auth';
  }
}
