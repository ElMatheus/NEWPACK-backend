import { Router } from "express";

import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  addImageOnProduct,
  deleteProductImage,
  updateProductImage
} from "../controllers/products.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductById);
productsRouter.post("/", createProduct);
productsRouter.put("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);
productsRouter.post("/image/:id", addImageOnProduct);
productsRouter.delete("/image/:productId", deleteProductImage);
productsRouter.put("/image/:productId", updateProductImage);


export default productsRouter;
