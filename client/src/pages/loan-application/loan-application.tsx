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
import { useLenderStore } from "../../store";
import {
  LoanDetailsFormValues,
  LoanFormData,
  PersonalDetailsFormValues,
} from "../../types";

const defaultValue: LoanFormData = {
  firstName: "",
  lastName: "",
  email: "",
  employmentStatus: "employed",
  employerName: "",
  loanPurpose: "vehicle",
  amount: null,
  deposit: null,
  loanTerm: null,
};

export const LoanApplication = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<LoanFormData>(defaultValue);

  const { fetchLenders } = useLenderStore();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const personalDetailsNext = (data: PersonalDetailsFormValues) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));

    // do something if needed
    handleNext();
  };

  const onLoanDetailsSubmit = async (data: LoanDetailsFormValues) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));

    await fetchLenders({
      deposit: data.deposit ?? 0,
      amount: data.amount ?? 0,
      loanTerm: data.loanTerm ?? 0,
    });
    handleNext();
  };

  const resetFormData = () => {
    setFormData(defaultValue);
  };

  const handleAgain = () => {
    setActiveStep(0);
    resetFormData();
  };

  const theme = useTheme();
  const steps = [
    {
      name: "personal-details",
      label: "Personal Details",
      component: (
        <PersonalDetailsStep
          defaultValue={defaultValue}
          formData={formData}
          onNext={personalDetailsNext}
          onReset={() => {
            setFormData((prev) => ({
              ...prev,
              loanPurpose: "vehicle",
              amount: null,
              deposit: null,
              loanTerm: null,
            }));
          }}
        />
      ),
    },
    {
      name: "loan-details",
      label: "Loan Details",
      component: (
        <LoanDetailsStep
          defaultValue={defaultValue}
          formData={formData}
          onNext={onLoanDetailsSubmit}
          onBack={handleBack}
          onReset={() => {
            setFormData((prev) => ({
              ...prev,
              firstName: "",
              lastName: "",
              email: "",
              employmentStatus: "employed",
              employerName: "",
            }));
          }}
        />
      ),
    },
    {
      name: "suggestions",
      label: "Loan Suggestions",
      component: (
        <LenderSuggestionsStep onBack={handleBack} onAgain={handleAgain} />
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
