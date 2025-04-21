import { Lender, LoanFormData } from "../../types";
import { BottomButtons } from "../bottom-buttons";
import { ICustomButton } from "../custom-button";
import { FlexCol } from "../display";
import { LenderList } from "../lender-list";

export const lenderList: Lender[] = [
  {
    id: "lender-a",
    name: "Lender A",
    monthly: 300,
    interest: 5.5,
    fee: "$10 processing fee",
  },
  {
    id: "lender-b",
    name: "Lender B",
    monthly: 290,
    interest: 5.0,
    fee: "$15 application fee",
  },
  {
    id: "lender-c",
    name: "Lender C",
    monthly: 310,
    interest: 6.0,
  },
];

export const LenderSuggestionsStep = ({
  formData,
  onBack,
  onAgain,
}: {
  formData: LoanFormData;
  onBack: () => void;
  onAgain: () => void;
}) => {
  // hook api call
  console.log(formData);

  const backButton: ICustomButton = {
    option: "enable",
    variant: "text",
    sx: { color: "gray" },
    onClick: onBack,
    text: "Back",
  };

  const againButton: ICustomButton = {
    option: "enable",
    variant: "contained",
    color: "warning",
    text: "Again",
    onClick: onAgain,
  };

  return (
    <FlexCol gap={2}>
      <LenderList lenders={lenderList} />
      <BottomButtons
        buttonProps={{
          primary: againButton,
          destructive: backButton,
        }}
      />
    </FlexCol>
  );
};
