import { NextFunction, Response, Request } from "express";
import { LikeCreate, LikeService } from "../services/likesService";

const service = new LikeService();

export const createLikeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const like: LikeCreate = {
      id_user: req.body.id_user,
      id_comment: req.body.id_comment,
    };
    const createdLike = await service.createLike(like);

    res.status(201).json({
      message: "created like",
      data: createdLike,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const deleteLikeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const likeId = parseInt(req.params.id);
    const deletedRows = await service.deleteLikeById(likeId);

    if (!deletedRows) {
      return res.status(404).json({
        message: "like not found",
      });
    }

    res.status(200).json({
      message: "deleted like",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
