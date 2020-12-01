import { Route } from '@spetushkou/api-expressjs';
import express, { NextFunction, Request, Response, Router } from 'express';
import { FileController } from './FileController';

export class FileRoute implements Route {
  private controller: FileController;

  constructor(controller: FileController) {
    this.controller = controller;
  }

  getBaseUrl(): string {
    return '/files';
  }

  registerRoutes = (): Router => {
    const router = express.Router();

    router.post(`${this.getBaseUrl()}/upload`, [this.upload]);
    router.get(`${this.getBaseUrl()}/list`, [this.list]);
    router.get(`${this.getBaseUrl()}/download/:name`, [this.download]);

    return router;
  };

  private upload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.upload(req, res);
    } catch (error) {
      next(error);
    }
  };

  private list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.list(req, res);
    } catch (error) {
      next(error);
    }
  };

  private download = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.download(req, res);
    } catch (error) {
      next(error);
    }
  };
}
