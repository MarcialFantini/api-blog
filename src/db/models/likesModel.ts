import { DataTypes, Model, Sequelize } from "sequelize";

export const tableName = "likes";

export class LikesModel extends Model {
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: tableName,
      modelName: "Likes",
    };
  }
}

export const likeModels = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
