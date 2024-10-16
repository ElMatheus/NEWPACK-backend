import { Router } from "express";

import {
  sendEmail
} from "../controllers/emails.controller.js";

const emailsRouter = Router();

emailsRouter.post("/:idOrder", sendEmail);

export default emailsRouter;