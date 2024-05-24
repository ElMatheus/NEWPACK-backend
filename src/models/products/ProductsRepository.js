import pg from "../../database/index.js"
export default class ProductsRepository {
  constructor() {
    this.pg = pg;
  }

  async getProducts() {
    try {
      const allProducts = await this.pg.manyOrNone("SELECT products.id, products.name, products.toughness, products.dimension, products.description, products.unitary_value, product_images.image_url FROM products LEFT JOIN product_images ON products.id = product_images.product_id ORDER BY products.id");
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
        "INSERT INTO products (id, name, toughness, dimension, description, unitary_value) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        [product.id, product.name, product.toughness, product.dimension, product.description, product.unitary_value]
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

  async addImageOnProduct(id, image) {
    try {
      await this.pg.none("INSERT INTO product_images (product_id, image_url) VALUES ($1,$2)", [id, image]);
    } catch (error) {
      throw error;
    }
  }
}