import * as yup from "yup";
import { PersonalDetailsFormValues } from "../../../types";

export const personalDetailsSchema: yup.ObjectSchema<PersonalDetailsFormValues> =
  yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    employmentStatus: yup
      .mixed<PersonalDetailsFormValues["employmentStatus"]>()
      .oneOf(["employed", "self-employed", "unemployed"])
      .required("Employment status is required"),
    employerName: yup.string().when("employmentStatus", {
      is: "employed",
      then: (schema) => schema.required("Employer name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
