import { ReactNode } from "react";

interface ILoanStepperStep {
  name: string;
  label: string;
  component: ReactNode;
}

export interface ILoanStepper {
  steps: ILoanStepperStep[];
  activeStep?: number;
  alternativeLabel?: boolean;
}
