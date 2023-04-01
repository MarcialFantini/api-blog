import { sequelize } from "../libs/sequelize";

const LikeModel = sequelize.models.Like;

export interface LikeCreate {
  id_user: number;
  id_comment: number;
}

export class LikeService {
  async createLike(body: LikeCreate) {
    const like = await LikeModel.create({ ...body });
    return like;
  }

  async deleteLikeById(id: number) {
    const rowsDeleted = await LikeModel.destroy({ where: { id } });
    if (rowsDeleted === 0) {
      return null;
    }
    return rowsDeleted;
  }
}
