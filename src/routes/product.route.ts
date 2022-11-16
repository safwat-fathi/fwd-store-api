import { Router } from "express";
import { show, create, index } from "../controllers/product.controllers";
import { verifyToken } from "../middlewares/auth.middlewares";

const products = Router();

products.get("/", index);
products.get("/:prodId", show);
products.post("/create", verifyToken, create);

export default products;
