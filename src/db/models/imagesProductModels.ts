import { DataTypes, Model, Sequelize } from "sequelize";

const imagesName = "images_products";

export class ImagesModelProducts extends Model {
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: imagesName,
      modelName: "ImagesModelProducts",
    };
  }
}

export const ImagesProductsSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  url_img: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
  product_id: { type: DataTypes.INTEGER, allowNull: false },
};
