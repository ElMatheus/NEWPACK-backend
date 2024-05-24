import Order from "../models/orders/Order.js";
import OrderDetail from "../models/orders/OrderDetail.js";
import OrdersRepository from "../models/orders/OrderRepository.js";
import UsersRepository from "../models/users/UsersRepository.js";
import ProductsRepository from "../models/products/ProductsRepository.js";

const ordersRepository = new OrdersRepository();
const usersRepository = new UsersRepository();
const productsRepository = new ProductsRepository();

export const getOrders = async (req, res) => {
  try {
    const allOrders = await ordersRepository.getOrders();

    return res.status(200).send(allOrders);

  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar pedidos", error: error.message });
  }
}

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await ordersRepository.getOrderById(id);

    if (!order) {
      return res.status(404).send({ message: "Pedido não encontrado" });
    }

    return res.status(200).send({ message: "Pedido encontrado", order });

  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar pedido", error: error.message });
  }
}

export const createOrder = async (req, res) => {
  try {
    const { client_id, status } = req.body;
    const userAlreadyExists = await usersRepository.getUserById(client_id);

    if (!userAlreadyExists) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    const newOrder = new Order(client_id, status);

    await ordersRepository.createOrder(newOrder);

    return res.status(201).send({ message: "Pedido criado com sucesso", newOrder });

  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar pedido", error: error.message });
  }
}

export const createOrderDetail = async (req, res) => {
  try {
    const { order_id, product_id, quantity } = req.body;
    const orderAlreadyExists = await ordersRepository.getOrderById(order_id);

    if (!orderAlreadyExists) {
      return res.status(404).send({ message: "Pedido não encontrado" });
    }

    const productAlreadyExists = await productsRepository.getProductById(product_id);

    if (!productAlreadyExists) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    console.log(productAlreadyExists);

    const newOrderDetail = new OrderDetail(order_id, product_id, quantity, productAlreadyExists.unitary_value);

    await ordersRepository.createOrderDetail(newOrderDetail);

    return res.status(201).send({ message: "Detalhe do pedido criado com sucesso", newOrderDetail });

  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar detalhe do pedido", error: error.message });
  }
}