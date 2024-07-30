import { v4 as uuidv4 } from "uuid";

export default class User {
  constructor(name, cnpj, tel, password) {
    this.id = uuidv4();
    this.name = name;
    this.cnpj = cnpj;
    this.tel = tel;
    this.password = password;
  }
}
