import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { decodeToken } from "../helpers/auth";

dotenv.config();

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
    const tokenDecoded = decodeToken(token);
    console.log(
      "🚀 ~ file: auth.middlewares.ts:22 ~ tokenDecoded",
      tokenDecoded
    );

    req.body.userId = tokenDecoded.user.id;
    next();
  } catch (err) {
    return res.status(500).json({ message: `${err}` });
  }
};
