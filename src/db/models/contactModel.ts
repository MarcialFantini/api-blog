import { DataTypes, Model, Sequelize } from "sequelize";

export const tableName = "contact";

export class ContactModel extends Model {
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName,
      modelName: "Contact",
    };
  }
}

export const ContactSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.STRING, allowNull: false },
};
