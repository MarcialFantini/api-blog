import { Express, Router } from "express";
import { routeBlogs } from "./blogsRoute";
import { userRouter } from "./userRoute";
import { routerComment } from "./commentRoute";

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
};
