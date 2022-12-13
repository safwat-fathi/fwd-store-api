import { Router } from "express";
import { create, index } from "../controllers/product.controllers";
import { verifyToken } from "../middlewares/auth.middlewares";

const products = Router();

products.get("/", index);
products.post("/create", verifyToken, create);

export default products;
