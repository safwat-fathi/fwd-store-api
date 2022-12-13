import { Router } from "express";
import { showCurrent } from "../controllers/order.controllers";
import { verifyToken } from "../middlewares/auth.middlewares";

const orders = Router();

orders.get("/current", verifyToken, showCurrent);

export default orders;
