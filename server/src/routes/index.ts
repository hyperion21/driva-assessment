import express from "express";
import loanRoutes from "./loan-routes";
const router = express.Router();

router.use("/loans", loanRoutes);

export default router;
