import Product from "../models/products/Product.js";
import ProductsRepository from "../models/products/ProductsRepository.js";
const productsRepository = new ProductsRepository();

export const getProducts = async (req, res) => {
  try {
    const products = await productsRepository.getProducts();

    if (!products) {
      return res.status(404).send({ message: "Não há produtos cadastrados" });
    }
    return res.status(200).send({ totalProducts: products.length, products });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar produtos", error: error.message });
  }
}