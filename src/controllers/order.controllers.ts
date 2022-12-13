import { Request, Response } from "express";
import dotenv from "dotenv";
import { OrderStore } from "../models/order";

dotenv.config();

export const showCurrent = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(422).json({ message: "missing user id" });
    }

    const orderStore = new OrderStore();

    const order = await orderStore.showCurrent(<string>user_id);

    if (order) {
      return res.status(200).json({
        data: order,
        message: "Order found successfully",
      });
    }

    return res.status(400).json({
      message: "No order found",
    });
  } catch (error) {
    return res.status(500).json({
      message: String(error),
    });
  }
};
