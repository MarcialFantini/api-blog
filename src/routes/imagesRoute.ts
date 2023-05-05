import { Router } from "express";
import { upload } from "../middlewares/multerUpload";
import {
  deletedImageController,
  saveImagesController,
  sendImgController,
} from "../controllers/imagesControllers";

const imagesRoute = Router();

imagesRoute.post("/save", upload.array("images"), saveImagesController);
imagesRoute.delete("/delete/one/:id", deletedImageController);
imagesRoute.get("/one/:id", sendImgController);

export { imagesRoute };
