import { Router } from "express";

import {
  createLikeController,
  deleteLikeController,
} from "../controllers/likesControllers";

const likeRouter = Router();

likeRouter.post("/likes", createLikeController);
likeRouter.delete("/likes/:id", deleteLikeController);

export { likeRouter };
