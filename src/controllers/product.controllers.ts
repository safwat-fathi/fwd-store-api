import { Request, Response } from "express";
import dotenv from "dotenv";
import { ProductStore } from "../models/product";

dotenv.config();

export const show = async (req: Request, res: Response) => {
  const { prodId } = req.query;

  if (!prodId) {
    return res.status(422).json({ message: "missing product id" });
  }

  const prodStore = new ProductStore();

  const product = await prodStore.show(prodId as string);

  if (product) {
    return res.status(200).json({
      data: product,
      message: "Product found successfully",
    });
  }

  return res.status(400).json({
    message: "No product found",
  });
};

export const index = async (req: Request, res: Response) => {
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
};

export const create = async (req: Request, res: Response) => {
  const { name, price } = req.body;

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
};
