import { Request, Response } from "express";
import dotenv from "dotenv";
import { Product, ProductStore } from "../models/product";

dotenv.config();

export const index = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.query;

    const prodStore = new ProductStore();

    let result: Product | Product[];

    if (product_id) {
      // one product
      result = await prodStore.show(<string>product_id);
    } else {
      // all products
      result = await prodStore.index();
    }

    if (result) {
      return res.status(200).json({
        data: result,
        message: "Product found successfully",
      });
    }

    return res.status(400).json({
      message: "No product found",
    });
  } catch (error) {
    return res.status(500).json({
      message: String(error),
    });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(422).json({
        message: "Please provide name and price",
      });
    }

    const prodStore = new ProductStore();

    const newProduct = await prodStore.create({ name, price });

    if (newProduct) {
      return res.status(200).json({
        data: newProduct,
        message: "New product created successfully",
      });
    }

    return res.status(400).json({
      message: "No product created",
    });
  } catch (error) {
    return res.status(500).json({
      message: String(error),
    });
  }
};
