import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userService";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const serviceUser = new UserService();

export interface validUser {
  email: string;
  password: string;
}

export interface returnUser {
  id: number;
  email: string;
  role: string;
  password: string;
}
export const autUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: validUser = req.body;

    const user = (await serviceUser.validUser(email)) as returnUser | null;

    if (!user) {
      throw new Error("no found user");
    }

    if (!process.env.CLAVE_JWT) {
      throw new Error("no password ");
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw new Error("no correct password");
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        role: user.role,
      },
      process.env.CLAVE_JWT,
      { expiresIn: "12h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const autAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
      return res.status(204).json({ message: "email or password not found" });
    }
    const user = (await serviceUser.validUser(email)) as returnUser | null;
    if (!user || user.role !== "admin") {
      return res.status(401).json({ message: "not authorization" });
    }

    const passwordParser = await bcrypt.compare(password, user.password);
    const pass = process.env.CLAVE_JWT;

    if (!passwordParser || !pass) {
      return res
        .status(498)
        .json({ message: "not authorization", status: 498 });
    }

    const tokenAdmin = jwt.sign(
      { email: user.email, id: user.id, role: user.role },
      pass,
      { expiresIn: "12h" }
    );

    return res.json({ token: tokenAdmin });
  } catch (error) {
    res.json({ error });
  }
};
