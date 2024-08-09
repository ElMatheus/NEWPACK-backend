import pg from "../../database/index.js";
import dayjs from "dayjs";

export default class RefreshRepository {
  constructor() {
    this.pg = pg;
  }

  async createRefreshToken(token) {
    try {
      await this.pg.none("INSERT INTO refresh_token (id, user_id, expiresIn) VALUES ($1, $2, $3)", [
        token.id,
        token.userId,
        token.expiresIn
      ]);
      return token;
    } catch (error) {
      throw error;
    }
  }

  async getRefreshToken(refreshToken) {
    try {
      const token = await this.pg.oneOrNone("SELECT * FROM refresh_token WHERE id = $1", refreshToken);

      if (!token) {
        return null;
      };
      const now = dayjs().unix();
      const refreshTokenExpired = now > token.expiresin;

      if (refreshTokenExpired) {
        await this.pg.none("DELETE FROM refresh_token WHERE id = $1", refreshToken);
        return null;
      } else {
        await this.pg.none("UPDATE refresh_token SET expiresIn = $1 WHERE id = $2", [dayjs().add(30, "day").unix(), refreshToken]);
        return token;
      }

    } catch (error) {
      throw error;
    }
  }

  // async deleteRefreshToken(refreshToken) {
  //   try {
  //     await this.pg.none("DELETE FROM refresh_tokens WHERE token = $1", refreshToken);
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}