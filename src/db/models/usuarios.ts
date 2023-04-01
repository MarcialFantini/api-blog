import { DataTypes, Model, Sequelize } from "sequelize";

export const TableName = "user";

export class UserModel extends Model {
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      TableName,
      modelName: "User",
    };
  }
}

export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  phone: number;
}

export const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};
