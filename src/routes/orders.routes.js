import { Router } from "express";

import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderDetailById,
  createOrderDetail,
  deleteOrderDetail,
} from "../controllers/orders.controller.js";
// import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const ordersRouter = Router();

ordersRouter.get("/", getOrders);
ordersRouter.get("/:id", getOrderById);
ordersRouter.post("/", createOrder);
ordersRouter.put("/:id", updateOrder);
ordersRouter.delete("/:id", deleteOrder);
ordersRouter.get("/details/:id", getOrderDetailById);
ordersRouter.post("/details", createOrderDetail);
ordersRouter.delete("/details/:id", deleteOrderDetail);



export default ordersRouter;
