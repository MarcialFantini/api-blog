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

  async getAllBlogs(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const blogs = await model.findAndCountAll({
      where: { published: true },
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });
    return blogs;
  }

  async getBlogById(id: number) {
    const blog = await model.findOne({
      where: { id: id },
    });
    return blog;
  }

  async updateBlog(id: number, data: blogsUpdate) {
    const [, [updatedBlog]] = await model.update(data, {
      where: { id: id },
      returning: true,
    });
    return updatedBlog;
  }

  async deleteBlog(id: number) {
    const deletedBlog = await model.destroy({ where: { id: id } });
    return deletedBlog;
  }
}
