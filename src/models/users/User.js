import { v4 as uuidv4 } from "uuid";

export default class User {
  constructor(name, cnpj, password) {
    this.id = uuidv4();
    this.name = name;
    this.cnpj = cnpj;
    this.password = password;
  }
}
