import cors from "cors";
import express from "express";
import routes from "./routes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());
app.use("/api", routes);

export default app;
