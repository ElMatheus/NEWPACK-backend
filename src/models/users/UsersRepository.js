import pg from "../../database/index.js"
export default class UsersRepository {
  constructor() {
    this.pg = pg;
  };

  async getUsers() {
    try {
      const allUsers = await this.pg.manyOrNone("SELECT * FROM users");
      return allUsers;
    } catch (error) {
      throw error;
    }
  };

  async getUserById(id) {
    try {
      const user = await this.pg.oneOrNone("SELECT * FROM users WHERE id = $1", id);
      return user;
    } catch (error) {
      throw error;
    }
  };

  async createUser(user) {
    try {
      await this.pg.none("INSERT INTO users (id, name, cnpj, tel, password) VALUES ($1, $2, $3, $4, $5)", [
        user.id,
        user.name,
        user.cnpj,
        user.tel,
        user.password
      ]);
      return user;
    } catch (error) {
      throw error;
    }
  };

  async updateUser(id, name, cnpj, password) {
    try {
      const user = this.getUserById(id);

      if (!user) {
        return null;
      }

      const updateUser = await this.pg.oneOrNone(
        "UPDATE users SET name = $1, cnpj = $2, password = $3 WHERE id = $4 RETURNING *",
        [name, cnpj, password, id]
      );

      return updateUser;
    } catch (error) {
      throw error;
    }
  };

  async getUserByCnpj(cnpj) {
    try {
      const user = await this.pg.oneOrNone("SELECT * FROM users WHERE cnpj = $1", cnpj);
      return user;
    } catch (error) {
      throw error;
    }
  };

  async getUserByTel(tel) {
    try {
      const user = await this.pg.oneOrNone("SELECT * FROM users WHERE tel = $1", tel);
      return user;
    } catch (error) {
      throw error;
    }
  };

  async getUserByName(name) {
    try {
      const user = await this.pg.oneOrNone("SELECT * FROM users WHERE name = $1", name);
      return user;
    } catch (error) {
      throw error;
    }
  };


  async deleteUser(id) {
    try {
      await this.pg.none("DELETE FROM users WHERE id = $1", id);
    } catch (error) {
      throw error;
    }
  }

  async addAddressOnUser(id, address) {
    try {
      const userAddress = await this.pg.oneOrNone("INSERT INTO address_users (user_id, cep, street, number, complement, city, state, freight) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [
        id,
        address.cep,
        address.street,
        address.number,
        address.complement,
        address.city,
        address.state,
        address.freight
      ]);
      return userAddress;
    } catch (error) {
      throw error;
    }
  }

  async getAddressByUserId(id) {
    try {
      const address = await this.pg.manyOrNone("SELECT * FROM address_users WHERE user_id = $1", id);
      return address;
    } catch (error) {
      throw error;
    }
  };

  async updateAddressOnUser(id, address) {
    try {
      const userAddress = await this.pg.oneOrNone("UPDATE address_users SET cep = $1, street = $2, number = $3, complement = $4, city = $5, state = $6, freight = $7 WHERE id = $8", [
        address.cep,
        address.street,
        address.number,
        address.complement,
        address.city,
        address.state,
        address.freight,
        id
      ]);
      return userAddress;
    } catch (error) {
      throw error;
    }
  };

  async getAddressById(id) {
    try {
      const address = await this.pg.oneOrNone("SELECT * FROM address_users WHERE id = $1", id);
      return address;
    } catch (error) {
      throw error;
    }
  };

  async deleteAddress(id) {
    try {
      await this.pg.none("DELETE FROM address_users WHERE id = $1", id);
    } catch (error) {
      throw error;
    }
  };
};
