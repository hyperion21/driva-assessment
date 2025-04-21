import { useTheme } from "@mui/material";
import { useState } from "react";
import {
  FlexCol,
  H4,
  LenderSuggestionsStep,
  LoanDetailsStep,
  LoanStepper,
  PersonalDetailsStep,
} from "../../components";

export const LoanApplication = () => {
  const [activeStep, setActiveStep] = useState(0);

  const theme = useTheme();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const steps = [
    {
      name: "personal-details",
      label: "Personal Details",
      component: <PersonalDetailsStep onNext={handleNext} />,
    },
    {
      name: "loan-details",
      label: "Loan Details",
      component: <LoanDetailsStep onNext={handleNext} onBack={handleBack} />,
    },
    {
      name: "suggestions",
      label: "Loan Suggestions",
      component: (
        <LenderSuggestionsStep
          onBack={handleBack}
          onAgain={() => {
            setActiveStep(0);
          }}
        />
      ),
    },
  ];

  return (
    <FlexCol gap={2} padding={theme.spacing(4, 4)}>
      <H4 alignSelf={"center"}>Apply For Loan</H4>
      <LoanStepper steps={steps} activeStep={activeStep} alternativeLabel />
    </FlexCol>
  );
};
