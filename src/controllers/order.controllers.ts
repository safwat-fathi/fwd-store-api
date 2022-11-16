import { Request, Response } from "express";
import dotenv from "dotenv";
import { OrderStore } from "../models/order";

dotenv.config();

export const show = async (req: Request, res: Response) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(422).json({ message: "missing user id" });
  }

  const orderStore = new OrderStore();

  const order = await orderStore.show(userId as string);

  if (order) {
    return res.status(200).json({
      data: order,
      message: "Order found successfully",
    });
  }

  return res.status(400).json({
    message: "No order found",
  });
};
