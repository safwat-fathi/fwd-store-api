import { Request, Response } from "express";
import dotenv from "dotenv";
import { OrderStore } from "../models/order";

dotenv.config();

export const show = async (req: Request, res: Response) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(422).json({ message: "missing user id" });
  }

  const orderStore = new OrderStore();

  const order = await orderStore.show(user_id as string);

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
