CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    tel VARCHAR(15) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS address_users (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    street VARCHAR(255) NOT NULL,
    number INT NOT NULL,
    complement VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    freight VARCHAR(3) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS refresh_token (
    id VARCHAR(36) PRIMARY KEY,
    expiresIn INT NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    toughness VARCHAR(140),
    dimension VARCHAR(140),
    type VARCHAR(140) NOT NULL,
    category VARCHAR(140) NOT NULL,
    description TEXT NOT NULL,
    quantity_mts INT,
    unitary_value DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS product_images (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    image_url TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);


CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    client_id VARCHAR(36) NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_details (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unitary_price DECIMAL(10, 2) NOT NULL,
    full_price DECIMAL(10, 2) GENERATED ALWAYS AS (quantity * unitary_price) STORED,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);