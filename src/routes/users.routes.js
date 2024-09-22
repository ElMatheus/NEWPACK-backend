import { Router } from "express";

import {
  getUsers,
  getUserById,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  refresh,
  addAddressOnUser,
  getAddressByUserId,
  updateAddress,
  deleteAddress
} from "../controllers/users.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", ensureAuthenticated, getUserById);
usersRouter.get("/name/:name", getUserByName);
usersRouter.post("/", createUser);

usersRouter.get("/address/:userId", getAddressByUserId);
usersRouter.post("/address/:userId", addAddressOnUser);
usersRouter.put("/address/:id", updateAddress);
usersRouter.delete("/address/:id", deleteAddress);

usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);
usersRouter.post("/login", loginUser);
usersRouter.post("/refresh", refresh);





export default usersRouter;
