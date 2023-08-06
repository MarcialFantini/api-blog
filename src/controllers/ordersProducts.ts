import { Request, Response } from "express";
import { OrdersProductsService } from "../services/ordersProducts";

interface decodeToken {
  email: string;
  id: number;
  role: string;
}

interface responseCreate {
  token: string;
  id_product: number;
  amount: number;
}

import jwt from "jsonwebtoken";

const ordersProductsService = new OrdersProductsService();
const pass = process.env.CLAVE_JWT || "no clave";

export async function createOne(req: Request, res: Response) {
  try {
    const { token, id_product, amount } = req.body as responseCreate;

    const persona = jwt.verify(token, pass) as decodeToken;

    await ordersProductsService.createOne({
      id_product,
      id_user: persona.id,
      amount,
    });

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function delOne(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const isDeleted = await ordersProductsService.delOne(id);
    if (!isDeleted) {
      throw new Error("no deleted");
    }
    res.json({ code: 200 });
  } catch (error) {
    console.error(error);
    res.sendStatus(500).json({ code: 500, message: error });
  }
}

export async function updateOne(req: Request, res: Response) {
  const id = Number(req.params.id);
  const body = req.body;

  try {
    const isUpdated = await ordersProductsService.updateOne(id, body);
    res.json({ success: isUpdated });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function getList(req: Request, res: Response) {
  const page = Number(req.query.page) || 0;

  try {
    const listOrders = await ordersProductsService.getList(page);
    res.json(listOrders);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

interface bodyGetListUser {
  token: string;
}

export async function getListForUser(req: Request, res: Response) {
  const { token } = req.body as bodyGetListUser;

  const tokenDecode = jwt.verify(token, pass) as decodeToken;
  
  or

}
