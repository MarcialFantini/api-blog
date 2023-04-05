import { Router } from "express";

import {
  createLikeController,
  deleteLikeController,
} from "../controllers/likesControllers";
import { authUser } from "../middlewares/autUser";

const likeRouter = Router();

likeRouter.post("/", authUser, createLikeController);
likeRouter.delete("/:id", authUser, deleteLikeController);

export { likeRouter };
