import { Router } from "express";
import { login, signup, show, index } from "../controllers/user.controllers";
import { verifyToken } from "../middlewares/auth.middlewares";

const users = Router();

users.get("/", index);
users.get("/:user_id", verifyToken, show);
users.post("/login", login);
users.post("/signup", signup);

export default users;
