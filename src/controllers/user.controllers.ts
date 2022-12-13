import { Request, Response } from "express";
import dotenv from "dotenv";
import { User } from "../models/user";
import { UserStore } from "../models/user";
import { generateToken } from "../helpers/auth";

dotenv.config();

export const login = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      message: String(error),
    });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      message: String(error),
    });
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.query;

    const userStore = new UserStore();

    let result: User | User[];

    if (user_id) {
      result = await userStore.show(<string>user_id);
    } else {
      result = await userStore.index();
    }

    if (result) {
      return res.status(200).json({
        data: result,
        message: "Users found successfully",
      });
    }

    return res.status(400).json({
      message: "No user found",
    });
  } catch (error) {
    return res.status(500).json({
      message: String(error),
    });
  }
};
