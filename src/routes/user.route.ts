import { Router } from "express";
import { login, signup, index } from "../controllers/user.controllers";
import { verifyToken } from "../middlewares/auth.middlewares";

const users = Router();

users.post("/login", login);
users.post("/signup", signup);
users.get("/", verifyToken, index);

export default users;
