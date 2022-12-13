import supertest from "supertest";
import { app } from "../server";

const request = supertest(app);

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
    const payload = {
      firstName: "john",
      password: "password",
    };

    const res = await request
      .post("/api/users/login")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
  });
});

describe("Test orders", () => {
  it("GET /current", async () => {
    const res = await request.get("/api/orders/current?user_id=1");

    expect(Object.keys(res.body)).toContain("message");
  });
});

describe("Test products", () => {
  it("GET /", async () => {
    const res = await request.get("/api/products");

    expect(res.status).toBe(200);
  });
});
