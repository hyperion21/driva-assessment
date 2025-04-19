import { ReactNode } from "react";
import { IButtonsProp } from "../bottom-buttons";

interface ILoanStepperStep {
  name: string;
  label: string;
  component: ReactNode;
  bottomButtons: IButtonsProp;
}

export interface ILoanStepper {
  steps: ILoanStepperStep[];
  activeStep?: number;
  alternativeLabel?: boolean;
}
