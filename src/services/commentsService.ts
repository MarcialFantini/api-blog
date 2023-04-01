import { sequelize } from "../libs/sequelize";

const model = sequelize.models.Comments;

export class CommentService {
  async createComment(body: { content: string; id_user: number }) {
    const newComment = await model.create({ ...body });

    return newComment;
  }

  async deleteComment(id: number) {
    const deleted = await model.destroy({ where: { id: id } });
    return deleted;
  }
}
