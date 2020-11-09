import { NextFunction, Request, Response } from 'express';

export const ResponseHeaders = (_: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Origin', process.env.ACCESS_CONTROL_ALLOW_ORIGIN);
  res.header('Access-Control-Allow-Headers', process.env.ACCESS_CONTROL_ALLOW_HEADERS);
  res.header('Access-Control-Allow-Methods', process.env.ACCESS_CONTROL_ALLOW_METHODS);
  next();
};
