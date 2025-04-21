import { useFormStore, useLenderStore } from "../../store";
import { BottomButtons } from "../bottom-buttons";
import { ICustomButton } from "../custom-button";
import { FlexCol } from "../display";
import { LenderList } from "../lender-list";

export const LenderSuggestionsStep = ({
  onBack,
  onAgain,
}: {
  onBack: () => void;
  onAgain: () => void;
}) => {
  const { lenders, loading } = useLenderStore();
  const { resetFormData } = useFormStore();

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
    onClick: () => {
      onAgain();
      resetFormData();
    },
  };

  return (
    <FlexCol gap={2}>
      {!loading && <LenderList lenders={lenders} />}
      <BottomButtons
        buttonProps={{
          primary: againButton,
          destructive: backButton,
        }}
      />
    </FlexCol>
  );
};
