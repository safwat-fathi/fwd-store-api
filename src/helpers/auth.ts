import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user";

dotenv.config();

const jwt_secret = (process.env.JWT_SECRET as string) || "";

export const generateToken = (u: Partial<User>) => {
  const token = sign({ id: u.id, name: u.firstName }, jwt_secret);

  return token;
};
