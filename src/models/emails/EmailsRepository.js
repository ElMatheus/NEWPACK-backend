import NodeMailer from 'nodemailer';

export default class EmailsRepository {
  constructor() {
    this.transporter = NodeMailer.createTransport({
      secure: true,
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });
  }

  async sendEmail(email) {
    try {
      const mailOptions = {
        to: "naviladafolha@gmail.com",
        subject: `Pedido nº${email.id_pedido} de ${email.nome_cliente}`,
        html: `
        <h1>Detalhes do Pedido</h1>
        <p><strong>Cliente:</strong> ${email.nome_cliente}</p>
        <p><strong>Telefone:</strong> ${email.telefone_cliente}</p>
        <p><strong>CNPJ:</strong> ${email.cnpj_cliente}</p>
        <p><strong>Data do Pedido:</strong> ${email.data_pedido}</p>
        <p><strong>Status do Pedido:</strong> ${email.status_pedido}</p>
        <p><strong>Descrição do Pedido:</strong> ${email.descricao_pedido}</p>
        <p><strong>Preço Total do Pedido:</strong> R$${email.preco_total_pedido}</p>
        <p><strong>Parcelas:</strong> ${email.parcelas_pedido}</p>
        <p><strong>Valor das Parcelas:</strong> R$${email.valor_parcelas_pedido}</p>
        <h2>Detalhes do Cliente que Realizou o Pedido</h2>
        <p><strong>Nome:</strong> ${email.infosClient.name}</p>
        <p><strong>Telefone:</strong> ${email.infosClient.telephone}</p>
        <h2>Endereço</h2>
        <p><strong>CEP:</strong> ${email.infosAdress.cep}</p>
        <p><strong>Rua:</strong> ${email.infosAdress.street}</p>
        <p><strong>Cidade:</strong> ${email.infosAdress.city}</p>
        <p><strong>Estado:</strong> ${email.infosAdress.state}</p>
        <p><strong>Frete:</strong> ${email.infosAdress.freight}</p>
        <p><strong>Número:</strong> ${email.infosAdress.number}</p>
        <h2>Produtos</h2>
        <ul>
          ${email.products.map(product => `
            <li>
              <h3>${product.nome_produto}</h3>
              <p><strong>Peso:</strong> ${product.peso_produto}</p>
              <p><strong>Dimensão:</strong> ${product.dimensao_produto}</p>
              <p><strong>Descrição:</strong> ${product.descricao_produto}</p>
              <p><strong>Quantidade:</strong> ${product.quantidade_produto}</p>
              <p><strong>Preço Unitário:</strong> R$${product.preco_unico}</p>
              <p><strong>Preço Total:</strong> R$${product.preco_total}</p>
            </li>
          `).join('')}
        </ul>
        `,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  }
}