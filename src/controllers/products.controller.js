import Product from "../models/products/Product.js";
import ProductsRepository from "../models/products/ProductsRepository.js";
const productsRepository = new ProductsRepository();
// pegar todos os produtos
export const getProducts = async (req, res) => {
  try {
    const products = await productsRepository.getProducts();
    // verificacao se tem produtos cadastrados
    if (!products) {
      return res.status(404).send({ message: "Não há produtos cadastrados" });
    }
    return res.status(200).send({ totalProducts: products.length, products });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar produtos", error: error.message });
  }
};
// pegar produto por id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productsRepository.getProductById(id);
    // verificacao se produto existe
    if (!product) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    return res.status(200).send({ message: "Produto encontrado", product });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar produto", error: error.message });
  }
};
// pegar produto pela imagem
export const getProductByImage = async (req, res) => {
  try {
    const { image } = req.params;
    const product = await productsRepository.getProductByImage(image);
    // verificacao se produto existe
    if (!product) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    return res.status(200).send({ message: "Produto encontrado", product });

  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar produto", error: error.message });
  }
}
// criar produto
export const createProduct = async (req, res) => {
  try {
    const { id, name, toughness, dimension, type, category, description, quantity_mts, unitary_value } = req.body;

    const newProduct = new Product(id, name, toughness, dimension, type, category, description, quantity_mts, unitary_value);

    await productsRepository.createProduct(newProduct);

    return res.status(201).send({ message: "Produto criado com sucesso", newProduct });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar produto", error: error.message });
  }
};
// atualizar produto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, toughness, dimension, type, category, description, quantity_mts, unitary_value } = req.body;

    const product = await productsRepository.getProductById(id);
    // verificacao se produto existe
    if (!product) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    const updatedProduct = await productsRepository.updateProduct(name, toughness, dimension, type, category, description, quantity_mts, unitary_value, id);

    return res.status(200).send({ message: "Produto atualizado com sucesso", updatedProduct });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar produto", error: error.message });
  }
};
// deletar produto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productsRepository.getProductById(id);
    // verificacao se produto existe
    if (!product) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    await productsRepository.deleteProduct(id);

    return res.status(200).send({ message: "Produto deletado com sucesso" });
  }
  catch (error) {
    return res.status(500).send({ message: "Erro ao deletar produto", error: error.message });
  }
};
// adicionar imagem no produto
export const addImageOnProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    const product = await productsRepository.getProductById(id);
    // verificacao se produto existe
    if (!product) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    await productsRepository.addImageOnProduct(id, image);

    return res.status(200).send({ message: "Imagem adicionada com sucesso" });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao adicionar imagem", error: error.message });
  }
};
// deletar imagem de um produto
export const deleteProductImage = async (req, res) => {
  try {
    const { productId } = req.params;
    const { imageUrl } = req.body;

    const product = await productsRepository.getProductById(productId);
    const productImage = await productsRepository.getProductByImageAndProductId(imageUrl, productId);
    // verificacao se produto existe
    if (!product) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }
    // verificacao se imagem existe
    if (!productImage) {
      return res.status(404).send({ message: "Imagem não encontrada" });
    }

    await productsRepository.deleteProductImage(productId, imageUrl);

    return res.status(200).send({ message: "Imagem deletada com sucesso" });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao deletar imagem", error: error.message });
  }
};
// atualizar imagem de um produto
export const updateProductImage = async (req, res) => {
  try {
    const { productId } = req.params;
    const { oldImageUrl, newImageUrl } = req.body;

    const product = await productsRepository.getProductById(productId);
    const productImage = await productsRepository.getProductByImageAndProductId(oldImageUrl, productId);

    if (!product) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    if (!productImage) {
      return res.status(404).send({ message: "Imagem não encontrada" });
    }

    await productsRepository.updateProductImage(productId, oldImageUrl, newImageUrl);

    return res.status(200).send({ message: "Imagem atualizada com sucesso" });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar imagem", error: error.message });
  }
};
// pegar produtos pela categoria
export const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await productsRepository.getProductByCategory(category);
    // verificacao se produtos exist
    if (!products) {
      return res.status(404).send({ message: "Não há produtos cadastrados nessa categoria" });
    }

    return res.status(200).send({ totalProducts: products.length, products });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar produtos por categoria", error: error.message });
  }
};