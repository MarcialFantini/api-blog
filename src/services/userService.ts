import { sequelize } from "../libs/sequelize";

const UserModel = sequelize.models.User;

export interface UserCreate {
  name: string;
  password: string;
  email: string;
  phone: number;
}

export class UserService {
  async createUser(body: UserCreate) {
    const user = await UserModel.create({ ...body });
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
    const users = await UserModel.findAll();
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
