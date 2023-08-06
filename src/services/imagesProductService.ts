import path from "path";
import { sequelize } from "../libs/sequelize";
import fs from "fs";

const ImagesModelProducts = sequelize.models.ImagesModelProducts;

interface imagesRow {
  id: number;
  url_img: string;
  blog_id: number;
}

export class ImagesProductsService {
  async saveImages(paths: string[], product_id: number) {
    try {
      // Crea una nueva instancia del modelo de imágenes de productos
      for (let path of paths) {
        await ImagesModelProducts.create({
          url_img: path,
          product_id: product_id,
        });
      }

      return { message: "saved image" };
    } catch (error) {
      return {
        message: "Error al crear una nueva imagen de producto: " + error,
      };
    }
  }

  async deleteImage(imageId: number) {
    // Busca la imagen por su ID y la elimina
    const image = (await ImagesModelProducts.findByPk(
      imageId
    )) as imagesRow | null;
    if (!image) {
      return { message: "Imagen de producto no encontrada", status: 404 };
    }

    // Elimina el archivo de imagen del sistema de archivos
    const imagePath = path.join(__dirname, "../../", image.url_img);
    fs.unlinkSync(imagePath);

    await ImagesModelProducts.destroy({ where: { id: imageId } });

    return { message: "deleted", status: 200 };
  }

  async sendImage(id: number) {
    const img = (await ImagesModelProducts.findByPk(id)) as imagesRow | null;

    if (!img) {
      return { message: "Imagen no encontrada", status: 404 };
    }

    const pathComplete = "../../../" + img.url_img;

    const normalizedPath = path.normalize(pathComplete);
    const pathImg = path.join(__dirname, normalizedPath);

    console.log(pathImg);

    return {
      message: pathImg,
      status: 200,
    };
  }
}
