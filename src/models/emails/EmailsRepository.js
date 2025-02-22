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
        to: process.env.RECEIVE_EMAIL_USER,
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
        <div data-smartmail="gmail_signature" class="x_gmail_signature" dir="ltr">
        <div dir="ltr">
          <p style="line-height:9.35pt; background-image:initial; background-position:initial; background-repeat:initial" class="x_MsoNormal">
            <b><i><span style="font-family: Calibri, sans-serif; color: rgb(31, 73, 125) !important;">Atenciosamente,</span></i></b><span></span>
          </p>
          <p class="x_MsoNormal"><b><span>&nbsp;</span></b></p>
          <p class="x_MsoNormal"><span>&nbsp;</span></p>
          <p style="background-image:initial; background-position:initial; background-repeat:initial" class="x_MsoNormal">
            <b><span style="font-size: 15pt; font-family: &quot;Brush Script MT&quot;; color: rgb(31, 73, 125) !important;">Rodrigo Vellozo Braga</span></b><span></span>
          </p>
          <p style="background-image:initial; background-position:initial; background-repeat:initial" class="x_MsoNormal">
            <b><span style="font-size: 10pt; color: rgb(31, 73, 125) !important;">Comercial- Soluções New Pack - Ltda</span></b><span></span>
          </p>
          <p style="background-image:initial; background-position:initial; background-repeat:initial" class="x_MsoNormal">
            <span style="font-size: 10pt; color: rgb(31, 73, 125) !important;">Tel: (19) 3327.9120&nbsp; (19) 99699-1843&nbsp; ID-114*108758</span><span></span>
          </p>
          <p style="background-image:initial; background-position:initial; background-repeat:initial" class="x_MsoNormal">
            <span style="font-size: 10pt; color: rgb(31, 73, 125) !important;">Email:&nbsp;</span><span lang="EN-US"><a href="mailto:solucoesnewpack@gmail.com" title="mailto:solucoesnewpack@gmail.com" data-linkindex="2"><span style="font-size:10pt" lang="PT-BR">solucoesnewpack@gmail.com</span></a></span><span></span>
          </p>
          <p style="background-image:initial; background-position:initial; background-repeat:initial" class="x_MsoNormal">
            <span style="font-size: 10pt; color: rgb(31, 73, 125) !important;">Rua: Paulo Trombeta – 76&nbsp; Jd. Bom Retiro – Valinhos SP</span><span></span>
          </p>
          <p style="line-height:9.35pt; background-image:initial; background-position:initial; background-repeat:initial" class="x_MsoNormal">
            <b><span style="font-family: &quot;Agency FB&quot;, sans-serif; color: rgb(31, 73, 125) !important;">Levando Soluções para seus negócios</span></b><span></span>
          </p>
          <p style="line-height:9.35pt; background-image:initial; background-position:initial; background-repeat:initial" class="x_MsoNormal">&nbsp;<span lang="EN-US"><a data-auth="NotApplicable" rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/rodrigo.vellozo.161" title="https://www.facebook.com/rodrigo.vellozo.161" data-linkindex="3"><b><span style="font-family: &quot;Agency FB&quot;, sans-serif; color: rgb(17, 85, 204) !important;" lang="PT-BR">https://www.facebook.com/rodrigo.vellozo.161</span></b></a></span><span></span>
          </p>
          <p style="background-image:initial; background-position:initial; background-repeat:initial" class="x_MsoNormal">
            <b><span style="font-size: 20pt; font-family: Webdings; color: green !important;" lang="EN-US">P</span></b>&nbsp;<span style="font-size: 8pt; color: rgb(0, 102, 0) !important;">Antes de imprimir pense no&nbsp;meio ambiente</span><span></span>
          </p>
        </div>
      </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  }
}