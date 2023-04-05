import { CommentsModel } from "../db/models/comentariesModel";
import { LikesModel } from "../db/models/likesModel";
import { sequelize } from "../libs/sequelize";

const model = sequelize.models.Blogs;

interface blogsCreate {
  title: string;
  content: string;
  author: string;
  published: boolean;
  userId: number;
}

interface blogsUpdate {
  title?: string;
  content?: string;
  author?: string;
  published?: boolean;
}

export class BlogsService {
  async create(data: blogsCreate | any) {
    const createdModel = await model.create(data);
    return createdModel;
  }

  async getAllBlogs(page: number) {
    const offset = (page - 1) * 20;
    const blogs = await model.findAll({
      limit: 20,
      offset: offset,
      attributes: ["id", "title", "content", "author"],
      include: [{ model: LikesModel }, { model: CommentsModel }],
    });
    return blogs;
  }

  async getBlogById(id: number) {
    const blog = await model.findOne({
      attributes: ["id", "title", "content", "author"],
      include: [{ model: LikesModel }, { model: CommentsModel }],
      where: { id: id },
    });
    return blog;
  }

  async updateBlog(id: number, data: blogsUpdate) {
    const updatedBlog = await model.update(data, {
      where: { id: id },
    });
    return updatedBlog;
  }

  async deleteBlog(id: number) {
    const deletedBlog = await model.destroy({ where: { id: id } });
    return deletedBlog;
  }
}
