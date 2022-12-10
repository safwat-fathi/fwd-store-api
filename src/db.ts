import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = (process.env as {
  POSTGRES_DB: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
}) || {
  POSTGRES_DB: "",
  POSTGRES_USER: "",
  POSTGRES_PASSWORD: "",
};

const Client = new Pool({
  port: 5432,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

Client.on("connect", () => {
  console.log("Connected to database.");
});

Client.on("error", () => {
  throw new Error(`Error closing DB connection`);
});

export default Client;
