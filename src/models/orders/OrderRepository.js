import pg from "../../database/index.js"
export default class ProductsRepository {
  constructor() {
    this.pg = pg;
  }

  async getOrders() {
    try {
      const allOrders = await this.pg.manyOrNone("SELECT orders.id AS order_id, orders.client_id, users.name AS client_name, orders.order_date, orders.status, order_details.product_id, products.name AS product_name, order_details.quantity, order_details.full_price FROM orders INNER JOIN users ON orders.client_id = users.id INNER JOIN order_details ON orders.id = order_details.order_id INNER JOIN products ON order_details.product_id = products.id");
      return allOrders;
    } catch (error) {
      throw error;
    }
  }

  async getOrderById(id) {
    try {
      const order = await this.pg.oneOrNone("SELECT * FROM orders WHERE id = $1", [id]);
      return order;
    } catch (error) {
      throw error;
    }
  }

  async createOrder(order) {
    try {
      const newOrder = await this.pg.one(
        "INSERT INTO orders (client_id, status) VALUES ($1,$2) RETURNING *",
        [order.client_id, order.status]
      );
      return newOrder;
    } catch (error) {
      throw error;
    }
  }

  async createOrderDetail(orderDetail) {
    try {
      const newOrderDetail = await this.pg.one(
        "INSERT INTO order_details (order_id, product_id, quantity, unitary_price) VALUES ($1,$2,$3,$4) RETURNING *",
        [orderDetail.order_id, orderDetail.product_id, orderDetail.quantity, orderDetail.unitary_value]
      );
      return newOrderDetail;
    } catch (error) {
      throw error;
    }
  }

  //   async deleteProduct(id) {
  //     try {
  //       await this.pg.none("DELETE FROM products WHERE id = $1", [id]);
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  //   async addImageOnProduct(id, image) {
  //     try {
  //       await this.pg.none("INSERT INTO product_images (product_id, image_url) VALUES ($1,$2)", [id, image]);
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
}