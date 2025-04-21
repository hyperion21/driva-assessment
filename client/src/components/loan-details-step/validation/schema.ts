import * as yup from "yup";
import { LoanDetailsFormValues } from "../../../types";

export const loanDetailsSchema: yup.ObjectSchema<LoanDetailsFormValues> =
  yup.object({
    loanPurpose: yup
      .mixed<LoanDetailsFormValues["loanPurpose"]>()
      .oneOf(["vehicle", "home", "etc"])
      .required("Loan purpose is required"),
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .min(2000, "Minimum amount is $2000")
      .required("Amount is required"),
    deposit: yup
      .number()
      .typeError("Deposit must be a number")
      .min(0, "Deposit must be at least $0")
      .default(0)
      .when("loanPurpose", {
        is: "vehicle",
        then: (schema) =>
          schema.max(yup.ref("amount"), "Deposit must not exceed loan amount"),
        otherwise: (schema) => schema.default(0),
      }),
    loanTerm: yup
      .number()
      .typeError("Loan term must be a number")
      .min(1, "Minimum 1 year")
      .max(7, "Maximum 7 years")
      .required("Loan term is required"),
  });
