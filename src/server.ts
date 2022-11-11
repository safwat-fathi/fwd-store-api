import express, { Request, Response } from "express";
import dotenv from "dotenv";
import Client from "./db";
import { verifyToken } from "./middlewares";

dotenv.config();

const app: express.Application = express();
const PORT = (process.env.PORT as string) || "";

app.use(express.json());

app.get("/test", verifyToken, async function (req: Request, res: Response) {
  const connect = await Client.connect();

  const result = await connect.query("SELECT * FROM users");
  res.json({ users: result.rows[0] });
});

app.listen(PORT, function () {
  console.log(`starting app on port: ${PORT}`);
});
