import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import cors from "cors";

dotenv.config();

export const app: express.Application = express();
const PORT = (process.env.PORT as string) || "";

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api", routes);

app.listen(PORT, function () {
  console.log(`starting app on port: ${PORT}`);
});
