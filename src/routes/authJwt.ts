import { Router } from "express";
import { autAdmin, autUser } from "../controllers/authControllers";

const authRouter = Router();

authRouter.post("/login", autUser);
authRouter.post("/login/admin", autAdmin);

export { authRouter };
