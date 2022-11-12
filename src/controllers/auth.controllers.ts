import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { firstName, password } = req.body;

  if (!firstName || !password) {
    return res.status(400).json({ message: "missing credentials" });
  }

  // ! add UserStore to auth users
};

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, password } = req.body;

  if (!firstName || !lastName || !password) {
    return res.status(400).json({ message: "missing credentials" });
  }

  // ! add UserStore to auth users
};
