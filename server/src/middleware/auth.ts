import { NextFunction, Request, Response } from "express";

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.header("x-api-key");
  const validKey = process.env.API_KEY;

  if (!apiKey || apiKey !== validKey) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
};
