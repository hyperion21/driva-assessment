import { ButtonProps } from "@mui/material/Button";

export interface ICustomButton extends ButtonProps {
  option?: "hide" | "disable" | "enable";
  text?: string;
  variant?: "text" | "outlined" | "contained";
  color?: "inherit" | "primary" | "secondary" | "error" | "warning";
  onClick?: () => void;
}
