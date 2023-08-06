import path from "path";
import { sequelize } from "../libs/sequelize";

import fs from "fs";

export const modelImages = sequelize.models.ImagesModel;

interface imagesRow {
  id: number;
  url_image: string;
  blog_id: number;
}

export class ImagesService {
  async saveImages(paths: string[], blog_id: string) {
    for (const path of paths) {
      await modelImages.create({
        url_image: path,
        blog_id,
      });
    }
  }

  async deleteImage(id_img: number) {
    const imageRow = (await modelImages.findByPk(id_img)) as imagesRow | null;

    if (!imageRow) {
      return { message: "not found image", status: 416 };
    }

    const deleted = await modelImages.destroy({ where: { id: id_img } });

    if (!deleted) {
      return {
        message: "no deleted",
        status: 500,
      };
    }

    const pathComplete = "../../" + imageRow.url_image;

    const normalizedPath = path.normalize(pathComplete);
    const fullPath = path.join(__dirname, normalizedPath);

    console.log(fullPath);

    fs.unlink(fullPath, (err) => {
      if (err) {
        console.log(err);
      }
    });

    return {
      message: "all god",
      status: 200,
    };
  }

  async sendImage(id: number) {
    const img = (await modelImages.findByPk(id)) as imagesRow | null;

    if (!img) {
      return { message: "not found", status: 404 };
    }

    const pathComplete = "../../../" + img.url_image;

    const normalizedPath = path.normalize(pathComplete);
    const pathImg = path.join(__dirname, normalizedPath);

    return {
      message: pathImg,
      status: 200,
    };
  }
}
