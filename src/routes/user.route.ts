import { Router } from "express";
import { login, signup, show, index } from "../controllers/user.controllers";
import { verifyToken } from "../middlewares/auth.middlewares";

const users = Router();

users.post("/login", verifyToken, login);
users.post("/signup", verifyToken, signup);
users.get("/", verifyToken, show);

export default users;
