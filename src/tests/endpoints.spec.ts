import supertest from "supertest";
import { app } from "../server";

const request = supertest(app);

let token: string | null = null;

beforeAll(async () => {
  const payload = {
    firstName: "john",
    password: "password",
  };

  const res = await request
    .post("/api/users/login")
    .send(payload)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");

  token = res.body.data.accessToken;
});

describe("Test auth", () => {
  it("POST /signup", async () => {
    const payload = {
      firstName: "john",
      lastName: "doe",
      password: "password",
    };

    const res = await request
      .post("/api/users/signup")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
  });

  it("POST /login", async () => {
    expect(token).not.toBeNull();
  });

  it("GET /", async () => {
    const res = await request
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  it("GET /:user_id", async () => {
    const res = await request
      .get("/api/users?user_id=3")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});

describe("Test orders", () => {
  it("GET /current", async () => {
    const res = await request
      .get("/api/orders/current?user_id=1")
      .set("Authorization", `Bearer ${token}`);

    if (res.status === 400) {
      expect(res.body.message).toBe("No order found");
    } else {
      expect(res.status).toBe(200);
    }
  });
});

describe("Test products", () => {
  it("GET /", async () => {
    const res = await request.get("/api/products");

    expect(res.status).toBe(200);
  });

  it("GET /:product_id", async () => {
    const res = await request.get("/api/products?product_id=1");

    expect(res.status).toBe(200);
  });

  it("POST /create", async () => {
    const payload = {
      name: "stan-smaith shoes",
      price: 2000,
    };

    const res = await request
      .post("/api/products/create")
      .send(payload)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
  });
});
