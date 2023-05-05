import { Express, Router } from "express";
import { routeBlogs } from "./blogsRoute";
import { userRouter } from "./userRoute";
import { routerComment } from "./commentRoute";
import { likeRouter } from "./likeRoute";
import { authRouter } from "./authJwt";
import { routerContact } from "./contactRoute";
import { imagesRoute } from "./imagesRoute";
import { productsRouter } from "./productsRoute";
import { imagesProductRoute } from "./imagesProductRoute";

export const routerSetUp = (app: Express) => {
  // router ROOT
  const router = Router();

  // router for versions of routes
  const route_v1 = Router();

  // set router api

  app.use("/api", router);

  // routes v1
  router.use("/v1", route_v1);

  route_v1.use("/blogs", routeBlogs);
  route_v1.use("/user", userRouter);
  route_v1.use("/comment", routerComment);
  route_v1.use("/like", likeRouter);
  route_v1.use("/", authRouter);
  route_v1.use("/contact", routerContact);
  route_v1.use("/images", imagesRoute);
  route_v1.use("/products/images", imagesProductRoute);

  route_v1.use("/product", productsRouter);
};
