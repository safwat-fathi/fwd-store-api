import { Router } from "express";
import { show } from "../controllers/order.controllers";
import { verifyToken } from "../middlewares/auth.middlewares";

const orders = Router();

orders.get("/:user_id", verifyToken, show);

export default orders;
