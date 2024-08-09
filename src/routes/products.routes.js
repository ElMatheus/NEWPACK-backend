import { Router } from "express";

import {
  getProducts,
  getProductById,
  getProductByImage,
  deleteProduct,
  createProduct,
  updateProduct,
  addImageOnProduct,
  deleteProductImage,
  updateProductImage,
  getProductByCategory
} from "../controllers/products.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductById);
productsRouter.get("/image/:image", getProductByImage);
productsRouter.post("/", createProduct);
productsRouter.put("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);

productsRouter.post("/image/:id", addImageOnProduct);
productsRouter.delete("/image/:productId", deleteProductImage);
productsRouter.put("/image/:productId", updateProductImage);

productsRouter.get("/category/:category", getProductByCategory);


export default productsRouter;
