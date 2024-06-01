import { Router } from "express";

import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderDetailById,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
  getOrderByName
} from "../controllers/orders.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const ordersRouter = Router();

ordersRouter.get("/", getOrders);
ordersRouter.get("/:id", getOrderById);
ordersRouter.post("/", createOrder);
ordersRouter.put("/:id", updateOrder);
ordersRouter.delete("/:id", deleteOrder);
ordersRouter.get("/details/:id", getOrderDetailById);
ordersRouter.post("/details", createOrderDetail);
ordersRouter.put("/details/:id", updateOrderDetail);
ordersRouter.delete("/details/:id", deleteOrderDetail);
ordersRouter.get("/name/:name", ensureAuthenticated, getOrderByName);



export default ordersRouter;
