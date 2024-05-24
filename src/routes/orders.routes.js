import { Router } from "express";

import {
  getOrders,
  getOrderById,
  createOrder,
  createOrderDetail,
} from "../controllers/orders.controller.js";
// import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const ordersRouter = Router();

ordersRouter.get("/", getOrders);
ordersRouter.get("/:id", getOrderById);
ordersRouter.post("/", createOrder);
ordersRouter.post("/details", createOrderDetail);



export default ordersRouter;
