import { DataTypes, Model, Sequelize } from "sequelize";

export const TABLE_ORDER_PRODUCT = "orders_products_user";

export class OrderProduct extends Model {
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: TABLE_ORDER_PRODUCT,
      modelName: "OrdersProducts",
    };
  }
}

export const modelOderProduct = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  id_user: { type: DataTypes.INTEGER, allowNull: false },
  id_product: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.INTEGER, allowNull: false },
};
