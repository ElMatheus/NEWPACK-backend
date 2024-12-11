# Gestão Esportiva - BACKEND

Este projeto é um sistema de gestão esportiva desenvolvido em Node.js com Express.js. Ele permite gerenciar campeonatos, modalidades, times, jogadores, partidas, confrontos e feedbacks.

## Estrutura do Projeto

- **src/routes**: Contém as rotas da aplicação.
- **src/controllers**: Contém os controladores que lidam com a lógica de negócios.
- **src/models**: Contém os modelos e repositórios que interagem com o banco de dados.
- **src/database**: Contém os scripts SQL para criação das tabelas.

## Configuração do Banco de Dados

Certifique-se de ter um banco de dados PostgreSQL configurado. Execute o script `create-tables.sql` localizado em `src/database` para criar as tabelas necessárias.

## Instalação

1. Clone o repositório:
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd GestaoEsportiva-BACKEND
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente no arquivo `.env`.

## Executando a Aplicação

Para iniciar o servidor, execute:
```bash
npm start
