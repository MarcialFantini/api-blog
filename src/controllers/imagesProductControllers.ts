import { NextFunction, Request, Response } from "express";
import { ImagesProductsService } from "../services/imagesProductService";

const serviceImg = new ImagesProductsService();

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

    const data = await serviceImg.saveImages(imagePaths, req.body.product_id);

    res.status(201).json({ message: "Save Images", data });
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
      return res.status(500).json({ message: "no params ID", status: 500 });
    }

    const data = await serviceImg.deleteImage(id);

    if (data.status !== 200) {
      return res.status(data.status).json({ ...data });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error, status: 500 });
  }
};

export const sendImgController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const pathImg = await serviceImg.sendImage(id);
    if (pathImg.status !== 200) {
      return res.status(pathImg.status).json(pathImg);
    }

    res.sendFile(pathImg.message);
  } catch (error) {
    res.status(500).json({ message: "internal error", status: 500 });
  }
};
