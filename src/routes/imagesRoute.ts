import { Router } from "express";
import { upload } from "../middlewares/multerUpload";
import { saveImagesController } from "../controllers/imagesControllers";

const imagesRoute = Router();

imagesRoute.post("/save", upload.array("images"), saveImagesController);
imagesRoute.delete("deleted/one/:id");

export { imagesRoute };
