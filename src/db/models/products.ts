import { DataTypes, Model, Sequelize } from "sequelize";

export const nameTableProduct = "products";

export class ProductModel extends Model {
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: nameTableProduct,
      modeName: "Products",
    };
  }
}

export const productSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  price: { defaultValue: 0, type: DataTypes.INTEGER, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  name: { type: DataTypes.TEXT, allowNull: false },
};
