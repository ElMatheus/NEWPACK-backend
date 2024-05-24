export default class OrderDetail {
  constructor(order_id, product_id, quantity, unitary_value) {
    this.order_id = order_id;
    this.product_id = product_id;
    this.quantity = quantity;
    this.unitary_value = unitary_value;
  }
}
