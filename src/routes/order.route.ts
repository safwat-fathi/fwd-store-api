import { Router } from "express";
import { show } from "../controllers/order.controllers";
import { verifyToken } from "../middlewares/auth.middlewares";

const orders = Router();

orders.get("/:userId", verifyToken, show);

export default orders;
