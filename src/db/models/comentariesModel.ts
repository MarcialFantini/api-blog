import { DataTypes, Model, Sequelize } from "sequelize";

export const tableName = "comments";

export class CommentsModel extends Model {
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: tableName,
      modelName: "Comments",
    };
  }
}

export const modelComments = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_blog: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};
