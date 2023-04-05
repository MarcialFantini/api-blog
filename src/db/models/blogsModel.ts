import { DataTypes, Model, Sequelize } from "sequelize";

export const tableName = "blogs";

export class BlogsModel extends Model {
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: tableName,
      modelName: "Blogs",
    };
  }
}

export const modelSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  published: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "no category",
  },
};
