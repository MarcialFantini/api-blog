import { sequelize } from "../libs/sequelize";

const LikeModel = sequelize.models.Likes;

export interface LikeCreate {
  id_user: number;
  id_blog: number;
}

export class LikeService {
  async createLike(like: LikeCreate) {
    const [likeValues, created] = await LikeModel.findOrCreate({
      where: { id_user: like.id_user, id_blog: like.id_blog },
      defaults: { ...like },
    });

    return created;
  }

  async deleteLikeById(id: number) {
    const rowsDeleted = await LikeModel.destroy({ where: { id } });
    if (rowsDeleted === 0) {
      return null;
    }
    return rowsDeleted;
  }
}
