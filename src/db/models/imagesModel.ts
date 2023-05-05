import { DataTypes, Model, Sequelize } from "sequelize";

const imagesName = "images";

export class ImagesModel extends Model {
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: imagesName,
      modelName: "ImagesModel",
    };
  }
}

export const ImagesSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  url_image: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
  blog_id: { type: DataTypes.INTEGER, allowNull: false },
};
