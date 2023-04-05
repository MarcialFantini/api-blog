import { DataTypes, Sequelize } from "sequelize";
import { UserModel, UserSchema } from "./models/usuarios";
import { BlogsModel, modelSchema } from "./models/blogsModel";
import { CommentsModel, modelComments } from "./models/comentariesModel";
import { LikesModel, likeModels } from "./models/likesModel";
import { ContactModel, ContactSchema } from "./models/contactModel";
import { ImagesModel, ImagesSchema } from "./models/imagesModel";

export const setUpModels = (sequelize: Sequelize) => {
  UserModel.init(UserSchema, UserModel.config(sequelize));
  BlogsModel.init(modelSchema, BlogsModel.config(sequelize));
  CommentsModel.init(modelComments, CommentsModel.config(sequelize));
  LikesModel.init(likeModels, LikesModel.config(sequelize));
  ContactModel.init(ContactSchema, ContactModel.config(sequelize));
  ImagesModel.init(ImagesSchema, ImagesModel.config(sequelize));

  UserModel.hasMany(CommentsModel, {
    foreignKey: "id_user",
  });
  CommentsModel.belongsTo(UserModel, {
    foreignKey: "id_user",
  });

  BlogsModel.hasMany(CommentsModel, { foreignKey: "id_blog" });
  CommentsModel.belongsTo(BlogsModel, { foreignKey: "id_blog" });

  UserModel.hasMany(LikesModel, {
    foreignKey: "id_user",
  });
  LikesModel.belongsTo(UserModel, {
    foreignKey: "id_user",
  });

  BlogsModel.hasMany(LikesModel, {
    foreignKey: "id_blog",
  });
  LikesModel.belongsTo(BlogsModel, {
    foreignKey: "id_blog",
  });

  BlogsModel.hasMany(ImagesModel, { foreignKey: "blog_id" });
  ImagesModel.belongsTo(BlogsModel, { foreignKey: "blog_id" });
};
