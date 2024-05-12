import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
const expiresIn = dayjs().add(30, "day").unix();

export default class Refresh {
  constructor(userId) {
    this.id = uuidv4();
    this.userId = userId;
    this.expiresIn = expiresIn;
  }
}