import { AuthController, AuthRoute, Route } from '@spetushkou/api-expressjs';
import express, { NextFunction, Request, Response, Router } from 'express';

export class UserAuthRoute implements AuthRoute, Route {
  private controller: AuthController;
  private router: Router;

  constructor(constroller: AuthController) {
    this.controller = constroller;
    this.router = express.Router();
  }

  getBaseUrl(): string {
    return '/auth';
  }

  getRoute(): Router {
    this.router.post(`${this.getBaseUrl()}/signUp`, this.signUp);
    this.router.post(`${this.getBaseUrl()}/signIn`, this.signIn);
    this.router.post(`${this.getBaseUrl()}/signOut`, this.signOut);
    return this.router;
  }

  signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.signUp(req, res);
    } catch (error) {
      next(error);
    }
  };

  signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.signIn(req, res);
    } catch (error) {
      next(error);
    }
  };

  signOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.signOut(req, res);
    } catch (error) {
      next(error);
    }
  };
}
