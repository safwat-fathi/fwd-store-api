import { Router } from "express";
import users from "./user.route";

const routes = Router();

routes.use("/users", users);

export default routes;
