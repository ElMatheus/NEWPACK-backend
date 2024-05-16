CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS refresh_token (
    id VARCHAR(36) PRIMARY KEY,
    expiresIn INT NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    toughness VARCHAR(140) NOT NULL,
    dimension VARCHAR(140) NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO products (name, image, price, quantity, description, toughness, dimension) VALUES ('Product 1', 'https://images.tcdn.com.br/img/img_prod/1070779/produto_teste_imagem_1799_1_12776de39ee0bc59883518f5c22d3b7d.png',10.00, 100, 'Description of product 1', '8 a 12 shore A', '960 x 560');