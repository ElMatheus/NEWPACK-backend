import pg from "../../database/index.js"
export default class ProductsRepository {
  constructor() {
    this.pg = pg;
  }

  async getOrders() {
    try {
      const allOrders = await this.pg.manyOrNone("SELECT order_details.id AS orderDetail_id, orders.id AS order_id, orders.client_id, users.name AS client_name, orders.order_date, orders.status, order_details.product_id, products.name AS product_name, order_details.quantity, order_details.unitary_price,order_details.full_price FROM orders INNER JOIN users ON orders.client_id = users.id LEFT JOIN order_details ON orders.id = order_details.order_id LEFT JOIN products ON order_details.product_id = products.id");
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

  async updateOrder(id, client_id, order_date, status) {
    try {
      const updateUser = await this.pg.oneOrNone(
        "UPDATE orders SET client_id = $1, order_date = $2, status = $3 WHERE id = $4 RETURNING *",
        [client_id, order_date, status, id]
      );

      return updateUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteOrder(id) {
    try {
      await this.pg.none("DELETE FROM orders WHERE id = $1", [id]);
    } catch (error) {
      throw error;
    }
  }

  async getOrderDetailById(id) {
    try {
      const orderDetail = await this.pg.oneOrNone("SELECT * FROM order_details WHERE id = $1", [id]);
      return orderDetail;
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

  async updateOrderDetail(id, order_id, product_id, quantity, unitary_price) {
    try {
      const updateOrderDetail = await this.pg.oneOrNone(
        "UPDATE order_details SET order_id = $1, product_id = $2, quantity = $3, unitary_price = $4 WHERE id = $5 RETURNING *",
        [order_id, product_id, quantity, unitary_price, id]
      );

      return updateOrderDetail;
    } catch (error) {
      throw error;
    }
  }

  async deleteOrderDetail(id) {
    try {
      await this.pg.none("DELETE FROM order_details WHERE id = $1", [id]);
    } catch (error) {
      throw error;
    }
  }

  async getProductInOrder(order_id, product_id) {
    try {
      const productInOrder = await this.pg.oneOrNone(
        "SELECT * FROM order_details WHERE order_id = $1 AND product_id = $2",
        [order_id, product_id]
      );
      return productInOrder;
    } catch (error) {
      throw error;
    }
  }

  async getOrdersByIdUser(id) {
    try {
      const ordersOfUser = await this.pg.manyOrNone("SELECT users.id AS cliente_id,users.name AS cliente_nome, users.cnpj AS cliente_cnpj, orders.id AS pedido_id, orders.status AS pedido_status, orders.order_date AS order_date, products.id AS produto_id, products.name AS produto_nome, products.toughness AS produto_dureza, products.dimension AS produto_dimensao, products.type AS produto_tipo, products.category AS produto_categoria, products.description AS produto_desc, products.quantity_mts AS produto_quantidade_mts, order_details.quantity AS produto_quantidade, order_details.unitary_price AS produto_preco, array_agg(product_images.image_url) AS produto_imagens, order_details.full_price, (COALESCE(products.quantity_mts, 1) * order_details.full_price) AS total_value FROM orders INNER JOIN users ON orders.client_id = users.id INNER JOIN order_details ON orders.id = order_details.order_id INNER JOIN products ON order_details.product_id = products.id LEFT JOIN product_images ON products.id = product_images.product_id WHERE users.id = $1 GROUP BY users.id, users.name, users.cnpj, orders.id, orders.status, orders.order_date, products.id, products.name, products.toughness, products.dimension, products.description, order_details.quantity, order_details.unitary_price, order_details.full_price;", [id]);
      return ordersOfUser;
    } catch (error) {
      throw error;
    }
  }

  async getOrdersByIdUserAndCategory(id, category) {
    try {
      const ordersOfUser = await this.pg.manyOrNone("SELECT users.id AS cliente_id,users.name AS cliente_nome, users.cnpj AS cliente_cnpj, orders.id AS pedido_id, orders.status AS pedido_status, orders.order_date AS order_date, products.id AS produto_id, products.name AS produto_nome, products.toughness AS produto_dureza, products.dimension AS produto_dimensao, products.type AS produto_tipo, products.category AS produto_categoria, products.description AS produto_desc, products.quantity_mts AS produto_quantidade_mts, order_details.quantity AS produto_quantidade, order_details.unitary_price AS produto_preco, array_agg(product_images.image_url) AS produto_imagens, order_details.full_price, (COALESCE(products.quantity_mts, 1) * order_details.full_price) AS total_value FROM orders INNER JOIN users ON orders.client_id = users.id INNER JOIN order_details ON orders.id = order_details.order_id INNER JOIN products ON order_details.product_id = products.id LEFT JOIN product_images ON products.id = product_images.product_id WHERE users.id = $1 AND products.category = $2 GROUP BY users.id, users.name, users.cnpj, orders.id, orders.status, orders.order_date, products.id, products.name, products.toughness, products.dimension, products.description, order_details.quantity, order_details.unitary_price, order_details.full_price;", [id, category]);
      return ordersOfUser;
    } catch (error) {
      throw error;
    }
  }
}