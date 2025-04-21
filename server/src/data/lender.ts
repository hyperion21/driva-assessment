import { BaseLender } from "../types";

export const lenders: BaseLender[] = [
  {
    id: "lender-a",
    name: "Lender A",
    interest: 5.5,
    fee: "$10 processing fee",
  },
  {
    id: "lender-b",
    name: "Lender B",
    interest: 5.0,
    fee: "$15 application fee",
  },
  {
    id: "lender-c",
    name: "Lender C",
    interest: 6.0,
  },
];
