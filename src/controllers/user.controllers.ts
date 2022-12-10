import { Request, Response } from "express";
import dotenv from "dotenv";
import { User } from "../models/user";
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

  if (!user) {
    return res.status(400).json({
      message: "Login failed, please enter correct user name or password",
    });
  }

  const token = generateToken(user);

  return res.status(200).json({
    message: "Logged in successfully",
    data: {
      accessToken: token,
    },
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
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(422).json({ message: "missing user id" });
  }

  const userStore = new UserStore();

  const user = await userStore.show(user_id as string);

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

export const index = async (req: Request, res: Response) => {
  const userStore = new UserStore();

  const users: User[] = await userStore.index();

  if (users.length) {
    return res.status(200).json({
      data: users,
      message: "Users found successfully",
    });
  }

  return res.status(400).json({
    message: "No users found",
  });
};
