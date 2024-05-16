import { Router } from "express";

import {
  getProducts,
} from "../controllers/products.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const productsRouter = Router();

productsRouter.get("/", getProducts);

export default productsRouter;
