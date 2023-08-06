import { ImagesModelProducts } from "../db/models/imagesProductModels";
import { sequelize } from "../libs/sequelize";
import { ImagesService } from "./imagesService";

const ProductModel = sequelize.models.ProductModel;

const serviceImage = new ImagesService();

export interface ProductAttributes {
  id: number;
  price: number;
  stock: number;
  name: string;
}

export class ProductService {
  async createProduct(productData: ProductAttributes) {
    try {
      const product = await ProductModel.create({ ...productData });
      return product;
    } catch (error) {
      throw new Error("Error creating product");
    }
  }

  async updateProduct(productId: number, productData: ProductAttributes) {
    try {
      const product = await ProductModel.findByPk(productId);
      if (!product) {
        throw new Error("Product not found");
      }
      await product.update(productData);
      return product;
    } catch (error) {
      throw new Error("Error updating product");
    }
  }

  async deleteProduct(productId: number) {
    try {
      const product = await ProductModel.destroy({
        where: {
          id: productId,
        },
      });
      if (!product) {
        throw new Error("Product not found");
      }

      return true;
    } catch (error) {
      throw new Error("Error deleting product");
    }
  }

  async getProducts(limit = 20, page: number) {
    try {
      console.log(page);
      const products = await ProductModel.findAll({
        limit,
        offset: page * limit,
        include: [
          {
            model: ImagesModelProducts,
          },
        ],
      });

      return products;
    } catch (error) {
      throw new Error("Error getting products");
    }
  }

  async getProduct(productId: number) {
    try {
      const product = await ProductModel.findByPk(productId);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      throw new Error("Error getting product");
    }
  }
}
