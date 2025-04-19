import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { FlexCol } from "../display";
import { Body1 } from "../typography";
import { ILoanStepper } from "./loan-stepper.types";

export const LoanStepper = ({
  steps,
  activeStep = 0,
  alternativeLabel = false,
}: ILoanStepper) => {
  return (
    <FlexCol gap={1} width={"100%"}>
      <Stepper activeStep={activeStep} alternativeLabel={alternativeLabel}>
        {steps.map((step) => (
          <Step key={step.name}>
            <StepLabel>
              <Body1>{step.label}</Body1>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {steps[activeStep].component}
    </FlexCol>
  );
};
