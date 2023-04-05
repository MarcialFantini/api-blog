import { sequelize } from "../libs/sequelize";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import { Op } from "sequelize";

const UserModel = sequelize.models.User;

export interface UserCreate {
  name: string;
  password: string;
  email: string;
  phone: number;
}

export class UserService {
  async validUser(email: string) {
    const user = await UserModel.findOne({
      attributes: ["id", "role", "email", "password"],
      where: { email: email },
    });

    return user;
  }

  async createUser(body: UserCreate) {
    const user = await UserModel.create({
      role: "user",
      name: body.name,
      password: await bcrypt.hash(body.password, 10),
      email: body.email,
      phone: body.phone,
    });
    return user;
  }

  async getUserById(id: number) {
    const user = await UserModel.findByPk(id);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await UserModel.findOne({ where: { email } });
    return user;
  }

  async getAllUsers() {
    const users = await UserModel.findAll({
      attributes: ["id", "name", "email", "phone", "role"],
      where: {
        role: {
          [Op.ne]: "admin",
        },
      },
    });
    return users;
  }

  async updateUserById(body: any) {
    const [rowsUpdated, [updatedUser]] = await UserModel.update(
      { ...body },
      { returning: true, where: { id: body.id } }
    );
    if (rowsUpdated === 0) {
      return null;
    }
    return updatedUser;
  }

  async deleteUserById(id: number) {
    const rowsDeleted = await UserModel.destroy({ where: { id } });
    if (rowsDeleted === 0) {
      return null;
    }
    return rowsDeleted;
  }
}
