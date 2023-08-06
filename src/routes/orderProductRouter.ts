import { Request, Response, Router } from "express";
import {
  createOne,
  delOne,
  updateOne,
  getList,
} from "../controllers/ordersProducts";

const orderRouter = Router();

// Rutas para el controlador OrdersProductsController
orderRouter.post("/", createOne);
orderRouter.delete("/:id", delOne);
orderRouter.patch("/:id", updateOne);
orderRouter.get("/", getList);

export { orderRouter };
