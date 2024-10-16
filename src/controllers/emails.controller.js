import Email from "../models/emails/Email.js";
import OrdersRepository from "../models/orders/OrderRepository.js";
import ProductsRepository from "../models/products/ProductsRepository.js";
import EmailsRepository from "../models/emails/EmailsRepository.js";

const ordersRepository = new OrdersRepository();
const productsRepository = new ProductsRepository();
const emailsRepository = new EmailsRepository();


export const sendEmail = async (req, res) => {
  try {
    const { idOrder } = req.params;

    const orderAlreadyExists = await ordersRepository.getOrderById(idOrder);

    if (!orderAlreadyExists) {
      return res.status(404).send({ message: "Pedido não encontrado" });
    }

    let total_price = 0;

    const detailsOrder = await Promise.all(orderAlreadyExists.map(async (order) => {
      const product = await productsRepository.getProductById(order.product_id);
      total_price += Number(order.full_price);
      return {
        id_produto: product.id,
        nome_produto: product.name,
        peso_produto: product.toughness,
        dimensao_produto: product.dimension,
        descricao_produto: product.description,
        quantidade_produto: order.quantity,
        preco_unico: order.unitary_price,
        preco_total: order.full_price
      }
    }));

    const newEmail = new Email(
      orderAlreadyExists[0].order_id,
      orderAlreadyExists[0].client_id,
      orderAlreadyExists[0].client_name,
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