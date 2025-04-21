import { NextFunction, Request, Response } from "express";

export const validateLoanInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { amount, deposit, loanTerm } = req.body;

  if (
    typeof amount !== "number" ||
    typeof deposit !== "number" ||
    typeof loanTerm !== "number"
  ) {
    res.status(400).json({
      error: "Invalid input: amount, deposit, and loanTerm must be numbers",
    });
    return;
  }

  next();
};
