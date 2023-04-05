import { Router } from "express";
import {
  createBlogsController,
  deleteBlogsController,
  getBlogController,
  getBlogsController,
  updateBlogsController,
} from "../controllers/blogsControllers";
import { authMiddlewareAdmin } from "../middlewares/autAdmin";

const routeBlogs = Router();

routeBlogs.post("/create", authMiddlewareAdmin, createBlogsController);
routeBlogs.get("/page/:page", getBlogsController);
routeBlogs.get("/:id", getBlogController);
routeBlogs.patch("/:id", authMiddlewareAdmin, updateBlogsController);
routeBlogs.delete("/:id", authMiddlewareAdmin, deleteBlogsController);

export { routeBlogs };
