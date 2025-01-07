# 🛠️ Backend da Newpack

Este é o backend do sistema desenvolvido para a automação de pedidos na Newpack, com o objetivo de otimizar os processos internos. Construído em **Node.js**, o backend garante eficiência, segurança e robustez na comunicação entre o aplicativo e a infraestrutura da empresa.  

---

## 🚀 Tecnologias Utilizadas
- **Node.js**: Plataforma principal para a construção do backend.  
- **Express**: Framework para a criação de APIs RESTful de forma ágil e escalável.  
- **Nodemailer**: Biblioteca para envio automatizado de e-mails com os pedidos diretamente para a equipe da Newpack.  
- **JWT (Json Web Token)**: Implementação de tokens para autenticação e controle de acesso seguro.  

---

## 📦 Funcionalidades Principais
- **Automação de Pedidos**: Processamento eficiente de pedidos enviados pelo aplicativo.  
- **Envio de E-mails**: Os pedidos gerados são enviados automaticamente para o e-mail da equipe da Newpack.  
- **Autenticação Segura**: Login com proteção via JWT e renovação com Refresh Token.  
- **Rotas de API**: Comunicação clara entre o frontend e o backend por meio de endpoints organizados.  

---

## 🌐 Principais Rotas
> Algumas rotas do sistema foram simplificadas para demonstração.

### **Rotas de Pedido**
- `POST /order`: Criação de um novo pedido. Envia os dados diretamente para o e-mail da Newpack usando **Nodemailer**.  
  **Exemplo de Body**:
  ```json
  {
    "id": "2",
    "client_id": id_aleatório,
    "status": "Pendente",
    "description": "Pedido feito pelo sistema",
    "installment": 2
  }
- `POST /order-details`: Criação de um novo detalhe do pedido mostrando todas as informações necessárias.  
  **Exemplo de Body**:
  ```json
  {
    "order_id": "2",
    "product_id": "123",
    "quantity": 1
  }

### **Rotas de Autenticação**
- `POST /login`: Realiza o login do usuário e retorna um token de acesso e um refresh token.
- `POST /refresh`: Gera um novo token de acesso com base no refresh token.

## 📞 Dúvidas ou Interesse no Sistema
Se tiver alguma dúvida ou gostaria de utilizar o sistema, entre em contato conosco. Estamos à disposição para mais informações.

- **E-mail**: [matheusgomesgoncalves.564@gmail.com](mailto:matheusgomesgoncalves.564@gmail.com)
