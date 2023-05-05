import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
} from "../controllers/productController";

const productsRouter = Router();

// Ruta para crear un nuevo producto
productsRouter.post("/create", async (req, res) => {
  try {
    const productData = req.body;
    const product = await createProduct(productData);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Ruta para actualizar un producto existente
productsRouter.patch("/update/one/:productId", async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const productData = req.body;
    const product = await updateProduct(productId, productData);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Ruta para eliminar un producto
productsRouter.delete("/delete/one/:productId", async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const result = await deleteProduct(productId);
    res.json({ success: result });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Ruta para obtener todos los productos con un límite opcional
productsRouter.get("/list/limit/:limit/page/:page", async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 20;
    const offset = parseInt(req.params.page);
    const products = await getProducts(limit, offset);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Ruta para obtener un producto por su ID
productsRouter.get("/one/:productId", async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const product = await getProduct(productId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export { productsRouter };
