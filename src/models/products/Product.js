export default class Product {
  constructor(id, name, toughness, dimension, type, category, description, quantity_mts, unitary_value) {
    this.id = id;
    this.name = name;
    this.toughness = toughness;
    this.dimension = dimension;
    this.type = type;
    this.category = category;
    this.description = description;
    this.quantity_mts = quantity_mts;
    this.unitary_value = unitary_value;
  }
}
