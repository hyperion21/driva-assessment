export interface LoanFormData {
  firstName: string;
  lastName: string;
  email: string;
  employmentStatus: "employed" | "self-employed" | "unemployed";
  employerName?: string;
  loanPurpose: "vehicle" | "home" | "etc";
  amount: number | null;
  deposit: number | null;
  loanTerm: number | null;
}

export interface PersonalDetailsFormValues {
  firstName: string;
  lastName: string;
  email: string;
  employmentStatus: "employed" | "self-employed" | "unemployed";
  employerName?: string;
}

export interface LoanDetailsFormValues {
  loanPurpose: "vehicle" | "home" | "etc";
  amount: number | null;
  deposit: number | null;
  loanTerm: number | null;
}

export interface LoanRequest {
  amount: number;
  deposit: number;
  loanTerm: number;
}
