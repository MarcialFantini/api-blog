import { Request, Response, Router } from "express";
import {
  createBlogsController,
  deleteBlogsController,
  getBlogController,
  getBlogsController,
  getBlogsCustomLimit,
  getLastBlog,
  getLastBlogsController,
  seeders,
  updateBlogsController,
} from "../controllers/blogsControllers";
import { authMiddlewareAdmin } from "../middlewares/autAdmin";

const routeBlogs = Router();

routeBlogs.post("/create", authMiddlewareAdmin, createBlogsController);
routeBlogs.patch("/:id", authMiddlewareAdmin, updateBlogsController);
routeBlogs.delete("/:id", authMiddlewareAdmin, deleteBlogsController);

// Rutas públicas sin protección de autenticación
routeBlogs.get("/page/:page", getBlogsController);
routeBlogs.get("/one/:id", getBlogController);
routeBlogs.get("/last/one", getLastBlog);
routeBlogs.get("/last", getLastBlogsController);
routeBlogs.get("/custom/:limit", getBlogsCustomLimit);
routeBlogs.post("/seeders", seeders);

// Ruta para ejecutar un seeder (sin protección de autenticación)

export { routeBlogs };
