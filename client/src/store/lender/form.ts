import { create } from "zustand";
import { LoanFormData } from "../../types";

const defaultFormData: LoanFormData = {
  firstName: "",
  lastName: "",
  email: "",
  employmentStatus: "employed",
  employerName: "",
  loanPurpose: "vehicle",
  amount: 0,
  deposit: 0,
  loanTerm: 0,
};

interface FormStore {
  defaultFormData: LoanFormData;
  formData: LoanFormData;
  setFormData: (data: Partial<LoanFormData>) => void;
  resetFormData: () => void;
}

export const useFormStore = create<FormStore>((set) => ({
  defaultFormData: defaultFormData,
  formData: defaultFormData,
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetFormData: () =>
    set({
      formData: defaultFormData,
    }),
}));
