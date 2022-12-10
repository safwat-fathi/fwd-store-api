import express, { Request, Response } from "express";
import dotenv from "dotenv";
import Client from "./db";
import routes from "./routes";

dotenv.config();

const app: express.Application = express();
const PORT = (process.env.PORT as string) || "";

app.use(express.json());

app.use("/api", routes);

app.listen(PORT, function () {
  console.log(`starting app on port: ${PORT}`);
});
