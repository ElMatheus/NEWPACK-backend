import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
const expiresIn = dayjs().add(50, "second").unix();

export default class Refresh {
  constructor(userId) {
    this.id = uuidv4();
    this.userId = userId;
    this.expiresIn = expiresIn;
  }
}