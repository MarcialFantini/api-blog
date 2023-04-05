import { sequelize } from "../libs/sequelize";

const modelImages = sequelize.models.ImagesModel;

export class ImagesService {
  async saveImages(paths: string[], blog_id: string) {
    for (const path of paths) {
      await modelImages.create({
        url_img: path,
        blog_id,
      });
    }
  }

  async deleteImage(id_img: number) {
    const deleted = await modelImages.destroy({ where: { id: id_img } });

    return deleted;
  }
}
