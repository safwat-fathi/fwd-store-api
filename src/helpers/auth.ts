import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user";
import { CustomJwtPayload } from "../types/jwt";

dotenv.config();

const jwt_secret = (process.env.JWT_SECRET as string) || "";

export const generateToken = (u: Partial<User>) => {
  const token = sign({ id: u.id, name: u.firstName }, jwt_secret);

  return token;
};

export const decodeToken = (token: string) => {
  const tokenDecoded = verify(token, jwt_secret) as CustomJwtPayload;

  return tokenDecoded;
};
