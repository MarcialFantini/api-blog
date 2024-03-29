import { NextFunction, Response, Request } from "express";
import { BlogsService } from "../services/blogsService";
import { blogs } from "../../seeders/blogs";

const service = new BlogsService();

export interface BlogComplete {
  id: number;
  title: string;
  content: string;
  author: string;
  published: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export const seeders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.createSeeders();
  } catch (error) {
    res.json({ message: "error" });
  }
};

export const createBlogsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await service.create(req.body);

    res.status(201).json({
      message: blog.id,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getBlogsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.params.page);

    const blogs = await service.getAllBlogs(page);

    res.status(200).json({
      message: "success",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getBlogController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogId = parseInt(req.params.id);
    const blog = await service.getBlogById(blogId);

    if (!blog) {
      return res.status(404).json({
        message: "blog not found",
      });
    }

    res.status(200).json({
      message: "success",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const updateBlogsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogId = parseInt(req.params.id);
    const updatedBlog = await service.updateBlog(blogId, req.body);

    if (!updatedBlog) {
      return res.status(404).json({
        message: "blog not found",
      });
    }

    res.status(200).json({
      message: "updated blog",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const deleteBlogsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogId = parseInt(req.params.id);
    const deletedBlog = await service.deleteBlog(blogId);

    if (!deletedBlog) {
      return res.status(404).json({
        message: "blog not found",
      });
    }

    res.status(200).json({
      message: "deleted blog",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getLastBlogsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lastBlogs = await service.getLastBlogs();

    res.json({ message: lastBlogs, status: 200 });
  } catch (error) {
    res.json({
      message: "Error",
      status: 500,
    });
  }
};

export const getLastBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const last = await service.getLastBlog();

    res.json(last);
  } catch (error) {}
};

export const getBlogsCustomLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = Number(req.params.limit);

    const blogs = await service.getBlogsLimitsCustom(limit);
    if (!blogs) {
      return res.json({
        message: "Error",
        code: 500,
      });
    }

    res.json({
      message: blogs,
      code: 200,
    });
  } catch (error) {
    res.json({
      message: error,
      code: 500,
    });
  }
};
