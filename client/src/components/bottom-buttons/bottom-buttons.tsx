import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { CustomButton, ICustomButton } from "../custom-button";
import { FlexRow } from "../display";
import { IButtonsProp } from "./bottom-buttons.types";

interface IBottomButtons {
  buttonProps: IButtonsProp | null;
}

export const BottomButtons = ({
  buttonProps = {
    primary: { option: "hide" },
    secondary: { option: "hide" },
    destructive: { option: "hide" },
  },
}: IBottomButtons) => {
  const theme = useTheme();
  const hidePrimary =
    !buttonProps?.primary || buttonProps.primary.option === "hide";
  const hideSecondary =
    !buttonProps?.secondary?.option || buttonProps.secondary?.option === "hide";
  const hideDestructive =
    !buttonProps?.destructive?.option ||
    buttonProps.destructive?.option === "hide";

  return (
    <Box width={"100%"}>
      <Divider />
      <FlexRow justifyContent={"space-between"} mt={theme.spacing(2)}>
        <Box>
          {renderButton(
            hideDestructive,
            "destructive",
            buttonProps?.destructive
          )}
        </Box>
        <FlexRow justifyContent={"space-evenly"} spacing={theme.spacing(2)}>
          {renderButton(hideSecondary, "secondary", buttonProps?.secondary)}
          {renderButton(hidePrimary, "primary", buttonProps?.primary)}
        </FlexRow>
      </FlexRow>
    </Box>
  );
};

const renderButton = (
  hide: boolean,
  name: string,
  buttonProps?: ICustomButton
) => {
  if (hide) {
    return false;
  }

  return (
    <CustomButton data-testid={`${name}-button`} {...buttonProps}>
      {buttonProps?.text}
    </CustomButton>
  );
};
