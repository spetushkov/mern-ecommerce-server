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

    router.get(`${this.getBaseUrl()}`, [this.findAll]);
    router.get(`${this.getBaseUrl()}/:name`, [this.download]);
    // router.get(`${this.getBaseUrl()}/:name/download`, [this.download]);
    router.post(`${this.getBaseUrl()}`, [this.upload]);

    return router;
  };

  private findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.findAll(req, res);
    } catch (error) {
      next(error);
    }
  };

  private findByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.findByName(req, res);
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

  private upload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.upload(req, res);
    } catch (error) {
      next(error);
    }
  };
}
