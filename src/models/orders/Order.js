export default class Order {
  constructor(client_id, status, description, installment) {
    this.client_id = client_id;
    this.status = status;
    this.description = description;
    this.installment = installment;
  }
}
