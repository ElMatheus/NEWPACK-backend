import { Router } from "express";

import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  addImageOnProduct,
} from "../controllers/products.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductById);
productsRouter.post("/", createProduct);
productsRouter.delete("/:id", deleteProduct);
productsRouter.post("/image/:id", addImageOnProduct);


export default productsRouter;
