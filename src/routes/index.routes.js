import { Router } from "express";
import usersRouter from "./users.routes.js";
import productsRouter from "./products.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Servidor rodando perfeitamente!" });
});

router.use("/users", usersRouter);

router.use("/products", productsRouter);

export { router };
