import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { verify, sign } from "jsonwebtoken";
import { CustomJwtPayload } from "../types/jwt";

dotenv.config();

const JWT_SECRET = (process.env.JWT_SECRET as string) || "";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  const token = authorization?.split(" ")[1] as string;

  if (!token) {
    return res.status(403).json({ message: "not authorized" });
  }

  try {
    const tokenDecoded = verify(token, JWT_SECRET) as CustomJwtPayload;

    req.body.userId = tokenDecoded.user.id;
    next();
  } catch (err) {
    throw new Error(`${err}`);
  }
};
