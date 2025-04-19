import cors from "cors";
import express, { Request, Response } from "express";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express + TypeScript!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
