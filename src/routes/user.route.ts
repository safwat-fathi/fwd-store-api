import { Router } from "express";
import { login, signup, show } from "../controllers/user.controllers";

const users = Router();

users.post("/login", login);
users.post("/signup", signup);
users.get("/:userId", show);

export default users;
