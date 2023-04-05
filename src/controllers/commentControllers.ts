import { Request, Response } from "express";
import { CommentService } from "../services/commentsService";
import { decodeToken } from "../middlewares/autUser";
import { NextFunction } from "express-serve-static-core";

const commentService = new CommentService();

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const { content, id_blog, Token } = req.body;
    const newComment = await commentService.createComment({
      content,
      id_user: Token.id,
      id_blog,
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedComment = await commentService.deleteComment(Number(id));
    if (deletedComment) {
      res.status(200).json({ message: "Comment deleted successfully" });
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
