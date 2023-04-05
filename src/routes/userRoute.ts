import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserController,
  updateUserController,
} from "../controllers/userControllers";
import { authMiddlewareAdmin } from "../middlewares/autAdmin";

const userRouter = Router();

userRouter.get("/", authMiddlewareAdmin, getAllUsersController);

userRouter.get("/:id", authMiddlewareAdmin, getUserController);

userRouter.post("/", createUserController);

userRouter.put("/:id", updateUserController);

userRouter.delete("/:id", authMiddlewareAdmin, deleteUserController);

export { userRouter };
