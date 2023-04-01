import { NextFunction, Response, Request } from "express";
import { BlogsService } from "../services/blogsService";

const service = new BlogsService();

export const createBlogsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await service.create(req.body);

    res.status(201).json({
      message: "created blog",
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
    const limit = Number(req.params.limit);

    const blogs = await service.getAllBlogs(page, limit);

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
