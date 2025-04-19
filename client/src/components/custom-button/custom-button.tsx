import Button from "@mui/material/Button";
import { ICustomButton } from "./custom-button.types";

export const CustomButton = ({ text, ...props }: ICustomButton) => {
  return <Button {...props}>{text}</Button>;
};
