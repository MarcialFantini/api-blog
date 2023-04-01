import { Router } from "express";
import {
  createBlogsController,
  deleteBlogsController,
  getBlogController,
  getBlogsController,
  updateBlogsController,
} from "../controllers/blogsControllers";

const routeBlogs = Router();

routeBlogs.post("/create", createBlogsController);
routeBlogs.get("/:page/:limit", getBlogsController);
routeBlogs.get("/:id", getBlogController);
routeBlogs.put("/:id", updateBlogsController);
routeBlogs.delete("/:id", deleteBlogsController);

export { routeBlogs };
