import { Router } from "express";
import users from "./user.route";
import orders from "./order.route";

const routes = Router();

routes.use("/users", users);
routes.use("/orders", orders);

export default routes;
