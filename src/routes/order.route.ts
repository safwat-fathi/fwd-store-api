import { Router } from "express";
import { showCurrent } from "../controllers/order.controllers";

const orders = Router();

orders.get("/current", showCurrent);

export default orders;
