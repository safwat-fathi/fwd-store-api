import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { POSTGRES_DB, POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD } =
  (process.env as {
    POSTGRES_DB: string;
    POSTGRES_HOST: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
  }) || {
    POSTGRES_DB: "",
    POSTGRES_HOST: "",
    POSTGRES_USER: "",
    POSTGRES_PASSWORD: "",
  };

const Client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default Client;
