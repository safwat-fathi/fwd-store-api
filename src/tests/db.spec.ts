import { Product, ProductStore } from "../models/product";

const productStore = new ProductStore();

describe("User Model", () => {
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

    expect(result).toEqual({
      id: 1,
      name: "stan-smith",
      price: 2000,
    });
  });

  it("index method should return a list of products", async () => {
    const result = await productStore.index();

    expect(result).toEqual([
      {
        id: 1,
        name: "stan-smith",
        price: 2000,
      },
    ]);
  });

  it("show method should return the correct product", async () => {
    const result = await productStore.show("1");

    expect(result).toEqual({
      id: 1,
      name: "stan-smith",
      price: 2000,
    });
  });
});
