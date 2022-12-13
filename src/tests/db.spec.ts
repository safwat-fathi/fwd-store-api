import { ProductStore } from "../models/product";
import { UserStore } from "../models/user";
import { OrderStore } from "../models/order";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = (process.env as {
  BCRYPT_PASSWORD: string;
  SALT_ROUNDS: string;
}) || { BCRYPT_PASSWORD: "", SALT_ROUNDS: "" };

const productStore = new ProductStore();
const userStore = new UserStore();
const orderStore = new OrderStore();

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(productStore.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(productStore.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(productStore.create).toBeDefined();
  });

  it("create method should add a product", async () => {
    const result = await productStore.create({
      name: "stan-smith",
      price: 2000,
    });

    expect(result).not.toBeNull();
  });

  it("index method should return a list of products", async () => {
    const result = await productStore.index();

    expect(result).not.toBeNull();
  });

  it("show method should return the correct product", async () => {
    const result = await productStore.show("1");

    expect(result).not.toBeNull();
  });
});

describe("User Model", () => {
  it("should have an index method", () => {
    expect(userStore.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(userStore.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(userStore.create).toBeDefined();
  });

  it("create method should add a user", async () => {
    const result = await userStore.create({
      id: "1",
      firstName: "Ali",
      lastName: "Ahmed",
      password: "password",
    });

    expect(Object.values(result)).toContain("Ali");
  });

  it("index method should return a list of users", async () => {
    const result = await userStore.index();

    expect(result).not.toBeNull();
  });

  it("show method should return the correct user", async () => {
    const result = await userStore.show("1");

    expect(result).not.toBeNull();
  });
});

describe("Order Model", () => {
  it("should have a showCurrent order method", () => {
    expect(orderStore.showCurrent).toBeDefined();
  });

  it("showCurrent method should return result", async () => {
    const result = await orderStore.showCurrent("1");

    expect(result).not.toBeNull();
  });
});
