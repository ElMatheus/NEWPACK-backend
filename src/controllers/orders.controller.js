import Order from "../models/orders/Order.js";
import OrderDetail from "../models/orders/OrderDetail.js";
import OrdersRepository from "../models/orders/OrderRepository.js";
import UsersRepository from "../models/users/UsersRepository.js";
import ProductsRepository from "../models/products/ProductsRepository.js";

const ordersRepository = new OrdersRepository();
const usersRepository = new UsersRepository();
const productsRepository = new ProductsRepository();


// todas os pedidos
export const getOrders = async (req, res) => {
  try {
    const allOrders = await ordersRepository.getOrders();

    return res.status(200).send(allOrders);

  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar pedidos", error: error.message });
  }
};
// pedidos por id do pedido
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await ordersRepository.getOrderById(id);
    // verificacao se ja existe no banco
    if (!order) {
      return res.status(404).send({ message: "Pedido não encontrado" });
    }

    return res.status(200).send({ message: "Pedido encontrado", order });

  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar pedido", error: error.message });
  }
};
// criacao de pedido
export const createOrder = async (req, res) => {
  try {
    const { client_id, status } = req.body;
    const userAlreadyExists = await usersRepository.getUserById(client_id);
    // verificacao se existe o id do usuario
    if (!userAlreadyExists) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    const newOrder = new Order(client_id, status);

    await ordersRepository.createOrder(newOrder);

    return res.status(201).send({ message: "Pedido criado com sucesso", newOrder });

  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar pedido", error: error.message });
  }
};
// atualizar pedido
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { client_id, order_date, status } = req.body;
    const userAlreadyExists = await usersRepository.getUserById(client_id);
    // verificacao se existe o id do usuario
    if (!userAlreadyExists) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const orderAlreadyExists = await ordersRepository.getOrderById(id);
    // verificacao se pedido existe
    if (!orderAlreadyExists) {
      return res.status(404).send({ message: "Pedido não encontrado" });
    }

    const updatedOrder = await ordersRepository.updateOrder(id, client_id, order_date, status);

    return res.status(200).send({ message: "Pedido atualizado com sucesso", updatedOrder });

  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar pedido", error: error.message });
  }
};
// deletar pedido
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const orderAlreadyExists = await ordersRepository.getOrderById(id);
    // verificacao se pedido existe
    if (!orderAlreadyExists) {
      return res.status(404).send({ message: "Pedido não encontrado" });
    }

    await ordersRepository.deleteOrder(id);

    return res.status(200).send({ message: "Pedido excluído com sucesso" });

  } catch (error) {
    return res.status(500).send({ message: "Erro ao excluir pedido", error: error.message });
  }
};
// pegar detalhes do pedido por id (pedido com produtos)
export const getOrderDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderDetail = await ordersRepository.getOrderDetailById(id);
    // verificacao se detalhe do pedido existe
    if (!orderDetail) {
      return res.status(404).send({ message: "Detalhe do pedido não encontrado" });
    }

    return res.status(200).send({ message: "Detalhe do pedido encontrado", orderDetail });

  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar detalhes do pedido", error: error.message });
  }
};
// criar detalhe do pedido (um pedido com produtos e quantidade)
export const createOrderDetail = async (req, res) => {
  try {
    const { order_id, product_id, quantity } = req.body;
    const orderAlreadyExists = await ordersRepository.getOrderById(order_id);
    // verificacao se detalhe do pedido existe
    if (!orderAlreadyExists) {
      return res.status(404).send({ message: "Pedido não encontrado" });
    }

    const productAlreadyExists = await productsRepository.getProductById(product_id);
    // verificacao se produto existe
    if (!productAlreadyExists) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    const productAlreadyExistsInOrder = await ordersRepository.getProductInOrder(order_id, product_id);
    // verificacao se produto ja existe no pedido se sim atualiza a quantidade
    if (productAlreadyExistsInOrder) {
      productAlreadyExistsInOrder.quantity += Number(quantity);
      const updateProductInOrder = await ordersRepository.updateOrderDetail(productAlreadyExistsInOrder.id, productAlreadyExistsInOrder.order_id, productAlreadyExistsInOrder.product_id, productAlreadyExistsInOrder.quantity, productAlreadyExistsInOrder.unitary_price);
      return res.status(200).send({ message: "Já existe este produto neste pedido, pedido atualizado", updateProductInOrder });
    }

    const newOrderDetail = new OrderDetail(order_id, product_id, quantity, productAlreadyExists.unitary_value);

    await ordersRepository.createOrderDetail(newOrderDetail);

    await ordersRepository.updateOrder(order_id, orderAlreadyExists.client_id, orderAlreadyExists.order_date, "Pendente");

    return res.status(201).send({ message: "Detalhe do pedido criado com sucesso", newOrderDetail });

  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar detalhe do pedido", error: error.message });
  }
};
// atualizar detalhe do pedido
export const updateOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_id, product_id, quantity, unitary_price } = req.body;
    const orderAlreadyExists = await ordersRepository.getOrderById(order_id);
    // verificacao se pedido existe
    if (!orderAlreadyExists) {
      return res.status(404).send({ message: "Pedido não encontrado" });
    }

    const productAlreadyExists = await productsRepository.getProductById(product_id);
    // verificacao se produto existe
    if (!productAlreadyExists) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    const orderDetailAlreadyExists = await ordersRepository.getOrderDetailById(id);
    // verificacao se detalhe do pedido existe
    if (!orderDetailAlreadyExists) {
      return res.status(404).send({ message: "Detalhe do pedido não encontrado" });
    }

    const updatedOrderDetail = await ordersRepository.updateOrderDetail(id, order_id, product_id, quantity, unitary_price);

    return res.status(200).send({ message: "Detalhe do pedido atualizado com sucesso", updatedOrderDetail });

  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar detalhe do pedido", error: error.message });
  }
};
// deletar detalhe do pedido
export const deleteOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const orderDetailAlreadyExists = await ordersRepository.getOrderDetailById(id);
    // verificacao se detalhe do pedido existe
    if (!orderDetailAlreadyExists) {
      return res.status(404).send({ message: "Detalhe do pedido não encontrado" });
    }

    await ordersRepository.deleteOrderDetail(id);

    return res.status(200).send({ message: "Detalhe do pedido excluído com sucesso" });

  } catch (error) {
    return res.status(500).send({ message: "Erro ao excluir detalhe do pedido", error: error.message });
  }
};
// pegar pedido por id do usuario
export const getOrderByIdUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.query;
    const userAlreadyExists = await usersRepository.getUserById(id);
    // verificacao se usuario existe
    if (!userAlreadyExists) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    // verificacao se na rota passa a categoria se sim busca por categoria se nao busca todos
    if (category == "tudo") {
      const allOrders = await ordersRepository.getOrdersByIdUser(id);
      return res.status(200).send(allOrders);
    } else {
      const allOrders = await ordersRepository.getOrdersByIdUserAndCategory(id, category);
      return res.status(200).send(allOrders);
    }
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar todos os pedidos por id de usuario", error: error.message });
  }
};