import { Request, Response } from "express";
import dotenv from "dotenv";
import { ProductStore } from "../models/product";

dotenv.config();

export const show = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.query;

    if (!product_id) {
      return res.status(422).json({ message: "missing product id" });
    }

    const prodStore = new ProductStore();

    const product = await prodStore.show(product_id as string);

    if (product) {
      return res.status(200).json({
        data: product,
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

export const index = async (req: Request, res: Response) => {
  try {
    const prodStore = new ProductStore();

    const products = await prodStore.index();

    if (products) {
      return res.status(200).json({
        data: products,
        message: "Products found successfully",
      });
    }

    return res.status(400).json({
      message: "No products found",
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
