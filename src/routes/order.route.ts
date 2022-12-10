import { Router } from "express";
import { showCurrent } from "../controllers/order.controllers";

const orders = Router();

orders.get("/:user_id/current", showCurrent);

export default orders;
