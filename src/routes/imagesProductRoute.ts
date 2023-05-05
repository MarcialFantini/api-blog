import { Router } from "express";
import {
  saveImagesController,
  deletedImageController,
  sendImgController,
} from "../controllers/imagesProductControllers";
import { upload } from "../middlewares/multerUpload";

const imagesProductRoute = Router();

// Asigna los controladores a las rutas correspondientes
imagesProductRoute.post("/save", upload.array("images"), saveImagesController); // Asigna el controlador saveImagesController a la ruta POST "/"
imagesProductRoute.delete("/one/:id", deletedImageController); // Asigna el controlador deletedImageController a la ruta DELETE "/:id"
imagesProductRoute.get("/send/:id", sendImgController); // Asigna el controlador sendImgController a la ruta GET "/:id"

export { imagesProductRoute };
