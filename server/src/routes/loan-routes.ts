import express from "express";
import { lenders } from "../data";
import { auth, validateLoanInput } from "../middleware";
import { Lender } from "../types";

const router = express.Router();

const calculateMonthlyPayment = (
  loanAmount: number,
  interestRate: number,
  loanTerm: number
): number => {
  const monthlyInterestRate = interestRate / 12 / 100;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  return Math.round(monthlyPayment);
};

router.post("/calculate-lenders", auth, validateLoanInput, (req, res) => {
  const { amount, deposit, loanTerm } = req.body;
  const loanAmount = amount - deposit;

  const result: Lender[] = lenders.map((lender) => ({
    ...lender,
    monthly: calculateMonthlyPayment(loanAmount, lender.interest, loanTerm),
  }));

  res.json(result);
});

export default router;
