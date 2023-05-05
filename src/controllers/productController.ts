import { ProductService, ProductAttributes } from "../services/productsService";

const productService = new ProductService();

export const createProduct = async (productData: ProductAttributes) => {
  try {
    const product = await productService.createProduct(productData);
    return {
      error: false,
      message: "Product created successfully.",
      code: 201,
    };
  } catch (error) {
    return {
      error: true,
      message: "Error creating product.",
      code: 500,
    };
  }
};

export const updateProduct = async (
  productId: number,
  productData: ProductAttributes
) => {
  try {
    const product = await productService.updateProduct(productId, productData);
    return {
      error: false,
      message: "Product updated successfully.",
      code: 200,
    };
  } catch (error) {
    return {
      error: true,
      message: "Error updating product.",
      code: 500,
    };
  }
};

export const deleteProduct = async (productId: number) => {
  try {
    const result = await productService.deleteProduct(productId);
    return {
      error: false,
      message: "Product deleted successfully.",
      code: 200,
    };
  } catch (error) {
    return {
      error: true,
      message: "Error deleting product.",
      code: 500,
    };
  }
};

export const getProducts = async (limit = 20, offset = 0) => {
  try {
    const products = await productService.getProducts(limit, offset);
    return {
      error: false,
      message: "Products retrieved successfully.",
      code: 200,
      products,
    };
  } catch (error) {
    return {
      error: true,
      message: "Error retrieving products.",
      code: 500,
    };
  }
};

export const getProduct = async (productId: number) => {
  try {
    const product = await productService.getProduct(productId);
    return {
      error: false,
      message: "Product retrieved successfully.",
      code: 200,
    };
  } catch (error) {
    return {
      error: true,
      message: "Error retrieving product.",
      code: 500,
    };
  }
};
