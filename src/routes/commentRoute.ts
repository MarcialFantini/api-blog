import express from "express";

import {
  createComment,
  deleteComment,
} from "../controllers/commentControllers";
import { authUser } from "../middlewares/autUser";

const routerComment = express.Router();

// Ruta para crear un nuevo comentario
routerComment.post("/create", authUser, createComment);

// Ruta para eliminar un comentario existente
routerComment.delete("/:id", authUser, deleteComment);

export { routerComment };
