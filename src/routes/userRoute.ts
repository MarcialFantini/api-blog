import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserController,
  updateUserController,
} from "../controllers/userControllers";

const userRouter = Router();

userRouter.get("/", getAllUsersController);

userRouter.get("/:id", getUserController);

userRouter.post("/", createUserController);

userRouter.put("/:id", updateUserController);

userRouter.delete("/:id", deleteUserController);

export { userRouter };
