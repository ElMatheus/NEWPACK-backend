import { format } from 'date-fns';

export default class Email {
  constructor(id_pedido, id_cliente, nome_cliente, cep_address, street_address, city_address, state_address, freight_address, number_address, data_pedido, status_pedido, descricao_pedido, preco_total_pedido, parcelas_pedido, valor_parcelas_pedido, products) {
    this.id_pedido = id_pedido;
    this.id_cliente = id_cliente;
    this.nome_cliente = nome_cliente;
    this.infosAdress = {
      cep: cep_address,
      street: street_address,
      city: city_address,
      state: state_address,
      freight: freight_address,
      number: number_address
    }
    this.data_pedido = this.getFormattedDate(data_pedido);
    this.status_pedido = status_pedido;
    this.descricao_pedido = descricao_pedido;
    this.preco_total_pedido = preco_total_pedido;
    this.parcelas_pedido = parcelas_pedido;
    this.valor_parcelas_pedido = valor_parcelas_pedido;
    this.products = products;
  }

  getFormattedDate(date) {
    return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
  }
}
