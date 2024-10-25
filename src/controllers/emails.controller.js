import Email from "../models/emails/Email.js";
import OrdersRepository from "../models/orders/OrderRepository.js";
import ProductsRepository from "../models/products/ProductsRepository.js";
import EmailsRepository from "../models/emails/EmailsRepository.js";
import UsersRepository from "../models/users/UsersRepository.js";

const ordersRepository = new OrdersRepository();
const productsRepository = new ProductsRepository();
const emailsRepository = new EmailsRepository();
const usersRepository = new UsersRepository();

export const sendEmail = async (req, res) => {
  try {
    const { idOrder } = req.params;
    const { name, telephone } = req.body;

    const orderAlreadyExists = await ordersRepository.getOrderById(idOrder);

    if (!orderAlreadyExists) {
      return res.status(404).send({ message: "Pedido não encontrado" });
    }

    const addressUser = await usersRepository.getActiveAddressByUserId(orderAlreadyExists[0].client_id);

    let total_price = 0;

    const detailsOrder = await Promise.all(orderAlreadyExists.map(async (order) => {
      const product = await productsRepository.getProductById(order.product_id);
      total_price += Number(order.total_value);
      return {
        id_produto: product.id,
        nome_produto: product.name,
        peso_produto: product.toughness,
        dimensao_produto: product.dimension,
        descricao_produto: product.description,
        quantidade_produto: order.quantity,
        preco_unico: order.unitary_price,
        preco_total: order.total_value
      }
    }));

    const newEmail = new Email(
      orderAlreadyExists[0].order_id,
      orderAlreadyExists[0].client_id,
      orderAlreadyExists[0].client_name,
      orderAlreadyExists[0].client_tel,
      orderAlreadyExists[0].client_cnpj,
      name,
      telephone,
      addressUser.cep,
      addressUser.street,
      addressUser.city,
      addressUser.state,
      addressUser.freight,
      addressUser.number,
      orderAlreadyExists[0].order_date,
      orderAlreadyExists[0].status,
      orderAlreadyExists[0].description,
      total_price,
      orderAlreadyExists[0].installment,
      total_price / orderAlreadyExists[0].installment,
      detailsOrder
    );

    await emailsRepository.sendEmail(newEmail);

    return res.status(200).send({ message: "Email enviado com sucesso", email: newEmail });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao enviar email", error: error.message });
  }
};