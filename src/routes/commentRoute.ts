import express from "express";
import {
  createComment,
  deleteComment,
} from "../controllers/commentControllers";

const routerComment = express.Router();

// Ruta para crear un nuevo comentario
routerComment.post("/comments", createComment);

// Ruta para eliminar un comentario existente
routerComment.delete("/comments/:id", deleteComment);

export { routerComment };
