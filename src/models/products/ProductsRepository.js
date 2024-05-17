import pg from "../../database/index.js"
export default class ProductsRepository {
  constructor() {
    this.pg = pg;
  }

  async getProducts() {
    try {
      const allProducts = await this.pg.manyOrNone("SELECT * FROM products");
      return allProducts;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await this.pg.oneOrNone("SELECT * FROM products WHERE id = $1", [id]);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(product) {
    try {
      const newProduct = await this.pg.one(
        "INSERT INTO products (name, image, price, quantity, toughness, dimension, description) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
        [product.name, product.image, product.price, product.quantity, product.toughness, product.dimension, product.description]
      );
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      await this.pg.none("DELETE FROM products WHERE id = $1", [id]);
    } catch (error) {
      throw error;
    }
  }
}