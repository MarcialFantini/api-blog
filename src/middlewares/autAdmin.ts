import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface decodeToken {
  email: string;
  id: number;
  role: string;
}

interface CustomRequest extends Request {
  Token?: decodeToken;
}

export const authMiddlewareAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization as string | null;

    if (!token) {
      return res.json({ message: "missing token" });
    }

    const pass = process.env.CLAVE_JWT;

    if (!pass) {
      return res.status(500).json({ message: "internal error" });
    }

    const tokenDecoded = (await jwt.verify(token, pass)) as decodeToken | null;
    // { email: user.email, id: user.id, role: user.role }

    if (tokenDecoded?.role !== "admin") {
      throw new Error("role problem");
    }
    req.body.Token = tokenDecoded;
    next();
  } catch (error) {
    res.json({ message: error });
  }
};
