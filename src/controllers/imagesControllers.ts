import { NextFunction, Request, Response } from "express";
import { ImagesService } from "../services/imagesService";

const serviceImg = new ImagesService();

export const saveImagesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!Array.isArray(req.files)) {
      return res.status(500).json({ message: "error" });
    }

    const imagePaths = req.files.map((file) => {
      return file.path;
    });

    await serviceImg.saveImages(imagePaths, req.body.blog_id);

    res.status(201).json({ message: "Save Images" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deletedImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: number = Number(req.params.id);
    if (!Number.isInteger(id)) {
      res.status(500).json({ message: "no params ID", status: 500 });
    }

    serviceImg.deleteImage(id);
  } catch (error) {
    res.status(500).json({ message: error, status: 500 });
  }
};
