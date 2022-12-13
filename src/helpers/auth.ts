import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user";
import { CustomJwtPayload } from "../types/jwt";

dotenv.config();

const JWT_SECRET = <string>process.env.JWT_SECRET || "";

export const generateToken = (u: Partial<User>) => {
  const token = sign({ id: u.id, name: u.firstName }, JWT_SECRET);

  return token;
};

export const decodeToken = (token: string) => {
  const tokenDecoded = verify(token, JWT_SECRET) as CustomJwtPayload;

  return tokenDecoded;
};
