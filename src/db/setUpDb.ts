import { DataTypes, Sequelize } from "sequelize";
import { UserModel, UserSchema } from "./models/usuarios";
import { BlogsModel, modelSchema } from "./models/blogsModel";
import { CommentsModel, modelComments } from "./models/comentariesModel";
import { LikesModel, likeModels } from "./models/likesModel";

export const setUpModels = (sequelize: Sequelize) => {
  UserModel.init(UserSchema, UserModel.config(sequelize));
  BlogsModel.init(modelSchema, BlogsModel.config(sequelize));
  CommentsModel.init(modelComments, CommentsModel.config(sequelize));
  LikesModel.init(likeModels, LikesModel.config(sequelize));

  UserModel.hasMany(CommentsModel, {
    foreignKey: "id_user",
  });
  CommentsModel.belongsTo(UserModel, {
    foreignKey: "id_user",
  });

  UserModel.hasMany(LikesModel, {
    foreignKey: "id_user",
  });
  LikesModel.belongsTo(UserModel, {
    foreignKey: "id_user",
  });

  CommentsModel.hasMany(LikesModel, {
    foreignKey: "id_comment",
  });
  LikesModel.belongsTo(CommentsModel, {
    foreignKey: "id_comment",
  });
};
