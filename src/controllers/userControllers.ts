import { NextFunction, Response, Request } from "express";

import { UserCreate, UserService } from "../services/userService";

const service = new UserService();

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: UserCreate = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
    };
    const createdUser = await service.createUser(user);

    res.status(201).json({
      message: "created user",
      data: createdUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await service.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    res.status(200).json({
      message: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await service.getAllUsers();

    res.status(200).json({
      message: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.id);
    const updatedUser = await service.updateUserById({
      ...req.body,
      id: userId,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    res.status(200).json({
      message: "updated user",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.id);
    const deletedRows = await service.deleteUserById(userId);

    if (!deletedRows) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    res.status(200).json({
      message: "deleted user",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
