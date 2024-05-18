import pg from "../../database/index.js"
export default class UsersRepository {
  constructor() {
    this.pg = pg;
  }

  async getUsers() {
    try {
      const allUsers = await this.pg.manyOrNone("SELECT * FROM users");
      return allUsers;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await this.pg.oneOrNone("SELECT * FROM users WHERE id = $1", id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(user) {
    try {
      await this.pg.none("INSERT INTO users (id, name, cnpj, password) VALUES ($1, $2, $3, $4)", [
        user.id,
        user.name,
        user.cnpj,
        user.password
      ]);
      return user;
    } catch (error) {
      throw error;
    }
  }
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
  }

  async getUserByCnpj(cnpj) {
    try {
      const user = await this.pg.oneOrNone("SELECT * FROM users WHERE cnpj = $1", cnpj);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByName(name) {
    try {
      const user = await this.pg.oneOrNone("SELECT * FROM users WHERE name = $1", name);
      return user;
    } catch (error) {
      throw error;
    }
  }


  async deleteUser(id) {
    try {
      await this.pg.none("DELETE FROM users WHERE id = $1", id);
    } catch (error) {
      throw error;
    }
  }
}
