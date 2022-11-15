import { Router } from "express";
import { login, signup, show } from "../controllers/user.controllers";
import { verifyToken } from "../middlewares/auth.middlewares";

const users = Router();

users.post("/login", login);
users.post("/signup", signup);
users.get("/:userId", verifyToken, show);

export default users;
