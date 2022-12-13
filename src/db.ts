import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { ENV, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_USER, POSTGRES_PASSWORD } =
  (process.env as {
    ENV: string;
    POSTGRES_DB: string;
    POSTGRES_DB_TEST: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
  }) || {
    ENV: "",
    POSTGRES_DB: "",
    POSTGRES_DB_TEST: "",
    POSTGRES_USER: "",
    POSTGRES_PASSWORD: "",
  };

const Client = new Pool({
  max: 2,
  port: 5432,
  database: ENV === "test" ? POSTGRES_DB_TEST : POSTGRES_DB,
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
