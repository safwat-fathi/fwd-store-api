import { Router } from "express";
import users from "./user.route";
import orders from "./order.route";
import products from "./product.route";

const routes = Router();

routes.use("/users", users);
routes.use("/orders", orders);
routes.use("/products", products);

export default routes;
