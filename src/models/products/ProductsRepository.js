import pg from "../../database/index.js"
export default class ProductsRepository {
  constructor() {
    this.pg = pg;
  }

  async getProducts() {
    try {
      const allProducts = await this.pg.manyOrNone("SELECT products.id, products.name, products.toughness, products.dimension, products.type, products.category, products.description, products.quantity_mts,products.unitary_value, array_agg(product_images.image_url) AS images FROM products LEFT JOIN product_images ON products.id = product_images.product_id GROUP BY products.id");
      return allProducts;
    } catch (error) {
      throw error;
    }
  };

  async getProductById(id) {
    try {
      const product = await this.pg.oneOrNone("SELECT products.id, products.name, products.toughness, products.dimension, products.type, products.category, products.description, products.quantity_mts,products.unitary_value, array_agg(product_images.image_url) AS images FROM products LEFT JOIN product_images ON products.id = product_images.product_id WHERE products.id = $1 GROUP BY products.id", [id]);
      return product;
    } catch (error) {
      throw error;
    }
  };

  async getProductByImage(image) {
    try {
      const product = await this.pg.oneOrNone("SELECT * FROM products INNER JOIN product_images ON products.id = product_images.product_id WHERE product_images.image_url = $1", [image]);
      return product;
    } catch (error) {
      throw error;
    }
  };

  async getProductByImageAndProductId(image, productId) {
    try {
      const product = await this.pg.oneOrNone("SELECT * FROM products INNER JOIN product_images ON products.id = product_images.product_id WHERE product_images.image_url = $1 AND products.id = $2", [image, productId]);
      return product;
    } catch (error) {
      throw error;
    }
  };

  async createProduct(product) {
    try {
      const newProduct = await this.pg.one(
        "INSERT INTO products (id, name, toughness, dimension, type, category, description, quantity_mts, unitary_value) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
        [product.id, product.name, product.toughness, product.dimension, product.type, product.category, product.description, product.quantity_mts, product.unitary_value]
      );
      return newProduct;
    } catch (error) {
      throw error;
    }
  };

  async updateProduct(name, toughness, dimension, type, category, description, quantity_mts, unitary_value, id) {
    try {
      const updatedProduct = await this.pg.one(
        "UPDATE products SET name = $1, toughness = $2, dimension = $3, type = $4, category = $5, description = $6, quantity_mts = $7, unitary_value = $8 WHERE id = $9 RETURNING *",
        [name, toughness, dimension, type, category, description, quantity_mts, unitary_value, id]
      );
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  };

  async deleteProduct(id) {
    try {
      await this.pg.none("DELETE FROM products WHERE id = $1", [id]);
    } catch (error) {
      throw error;
    }
  };

  async addImageOnProduct(id, image) {
    try {
      await this.pg.none("INSERT INTO product_images (product_id, image_url) VALUES ($1,$2)", [id, image]);
    } catch (error) {
      throw error;
    }
  };

  async deleteProductImage(productId, imageUrl) {
    try {
      await this.pg.none("DELETE FROM product_images WHERE product_id = $1 AND image_url = $2", [productId, imageUrl]);
    } catch (error) {
      throw error;
    }
  };

  async updateProductImage(productId, oldImageUrl, newImageUrl) {
    try {
      const updatedImage = await this.pg.one(
        "UPDATE product_images SET image_url = $1 WHERE product_id = $2 AND image_url = $3 RETURNING *",
        [newImageUrl, productId, oldImageUrl]
      );
      return updatedImage;
    } catch (error) {
      throw error;
    }
  };

  async getProductByCategory(category) {
    try {
      const products = await this.pg.manyOrNone("SELECT products.id, products.name, products.toughness, products.dimension, products.type, products.category, products.description, products.quantity_mts,products.unitary_value, array_agg(product_images.image_url) AS images FROM products LEFT JOIN product_images ON products.id = product_images.product_id WHERE products.category = $1 GROUP BY products.id", [category]);
      return products;
    } catch (error) {
      throw error;
    }
  };
};