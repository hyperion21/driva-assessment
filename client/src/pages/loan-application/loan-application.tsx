import { useTheme } from "@mui/material";
import { useState } from "react";
import { FlexCol, H4, ICustomButton, LoanStepper } from "../../components";
import { LoanFormData } from "../../types";

const defaultValue: LoanFormData = {
  firstName: "",
  lastName: "",
  email: "",
  employmentStatus: "employed",
  employerName: "",
  loanPurpose: "vehicle",
  amount: 0,
  deposit: 0,
  loanTerm: 1,
};

export const LoanApplication = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<LoanFormData>(defaultValue);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const nextButton: ICustomButton = {
    option: "enable",
    variant: "contained",
    text: "Next",
    onClick: handleNext,
  };

  const backButton: ICustomButton = {
    option: "enable",
    variant: "text",
    sx: { color: "gray" },
    onClick: () => {
      setActiveStep(activeStep - 1);
    },
    text: "Back",
  };

  const getCommonButton = (
    handleClick: () => void,
    text: string = "Reset"
  ): ICustomButton => ({
    option: "enable",
    variant: "text",
    sx: { color: "gray" },
    onClick: handleClick,
    text,
  });

  const againButton: ICustomButton = {
    option: "enable",
    variant: "contained",
    color: "warning",
    text: "Again",
    onClick: () => {
      setActiveStep(0);
    },
  };

  const submitButton: ICustomButton = {
    option: "enable",
    variant: "contained",
    text: "Submit",
    onClick: handleNext,
  };

  const theme = useTheme();
  const steps = [
    {
      name: "personal-details",
      label: "Personal Details",
      component: <></>,
      bottomButtons: {
        primary: nextButton,
        secondary: getCommonButton(() => {}),
      },
    },
    {
      name: "loan-details",
      label: "Loan Details",
      component: <></>,
      bottomButtons: {
        primary: submitButton,
        secondary: getCommonButton(() => {}),
        destructive: backButton,
      },
    },
    {
      name: "suggestions",
      label: "Loan Suggestions",
      component: <></>,
      bottomButtons: {
        primary: againButton,
        destructive: backButton,
      },
    },
  ];

  return (
    <FlexCol gap={2} padding={theme.spacing(4, 4)}>
      <H4 alignSelf={"center"}>Apply For Loan</H4>
      <LoanStepper steps={steps} activeStep={activeStep} alternativeLabel />
    </FlexCol>
  );
};
