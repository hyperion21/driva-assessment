import axios from "axios";
import { Lender, LoanRequest } from "../../types";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
const API_KEY = process.env.REACT_APP_API_KEY || "";

export const getLenderSuggestions = async (
  data: LoanRequest
): Promise<Lender[]> => {
  const response = await axios.post(
    `${API_BASE_URL}/api/loans/calculate-lenders`,
    data,
    {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
