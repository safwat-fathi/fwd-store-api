import { Request, Response } from "express";
import dotenv from "dotenv";
import { UserStore } from "../models/user";
import { generateToken } from "../helpers/auth";

dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { firstName, password } = req.body;

  if (!firstName || !password) {
    return res.status(422).json({ message: "missing credentials" });
  }

  const userStore = new UserStore();

  const user = await userStore.auth(firstName, password);

  if (user) {
    const token = generateToken(user);

    return res.status(200).json({
      message: "Logged in successfully",
      data: {
        accessToken: token,
      },
    });
  }

  return res.status(400).json({
    message: "Login failed",
  });
};

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, password } = req.body;

  if (!firstName || !lastName || !password) {
    return res.status(422).json({ message: "missing credentials" });
  }

  const userStore = new UserStore();

  const newUser = await userStore.create({ firstName, lastName, password });

  if (newUser) {
    return res.status(200).json({
      message: "Sign up successfully",
    });
  }

  return res.status(400).json({
    message: "Sign up failed",
  });
};

export const show = async (req: Request, res: Response) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(422).json({ message: "missing user id" });
  }

  const userStore = new UserStore();

  const user = await userStore.show(userId as string);

  if (user) {
    return res.status(200).json({
      data: user,
      message: "User found successfully",
    });
  }

  return res.status(400).json({
    message: "No user found",
  });
};
