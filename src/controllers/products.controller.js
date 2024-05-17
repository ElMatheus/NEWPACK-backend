import e from "express";
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

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productsRepository.getProductById(id);

    if (!product) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    return res.status(200).send({ message: "Produto encontrado", product });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar produto", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, image, price, quantity, toughness, dimension, description } = req.body;

    const newProduct = new Product(name, image, price, quantity, toughness, dimension, description);

    await productsRepository.createProduct(newProduct);

    return res.status(201).send({ message: "Produto criado com sucesso", newProduct });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar produto", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productsRepository.getProductById(id);

    if (!product) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    await productsRepository.deleteProduct(id);

    return res.status(200).send({ message: "Produto deletado com sucesso" });
  }
  catch (error) {
    return res.status(500).send({ message: "Erro ao deletar produto", error: error.message });
  }
}