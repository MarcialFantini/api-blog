import { NextFunction, Request, Response } from "express";

export const httpTypeLogMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.method);
  next();
};
