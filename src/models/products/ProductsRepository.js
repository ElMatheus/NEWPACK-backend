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
}