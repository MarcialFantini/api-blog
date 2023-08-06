import { sequelize } from "../libs/sequelize";

const modelOrders = sequelize.models.OrdersProducts;

export class OrdersProductsService {
  async createOne(body: any) {
    await modelOrders.create(body);
  }

  async delOne(id: number) {
    const order = await modelOrders.destroy({ where: { id: id } });
    return 0 !== order;
  }

  async updateOne(id: number, body: any) {
    const [newOrder] = await modelOrders.update(
      { ...body },
      { where: { id: id } }
    );
    return 0 !== newOrder;
  }

  async getList(page: number) {
    const listOrders = modelOrders.findAll({
      limit: 20,
      offset: page > 0 ? page * 20 : 1,
    });
    return listOrders;
  }
}
