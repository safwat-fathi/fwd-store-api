import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "missing credentials" });
  }

  // ! add UserStore to auth users
};
