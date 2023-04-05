import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface decodeToken {
  email: string;
  id: number;
  role: string;
}

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    const clave = process.env.CLAVE_JWT;

    if (!token || !clave) {
      return res.status(401).json({ message: "token missing", code: 401 });
    }

    const tokenVerified = (await jwt.verify(token, clave)) as
      | decodeToken
      | undefined;

    req.body.Token = tokenVerified;

    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid token" });
  }
};
