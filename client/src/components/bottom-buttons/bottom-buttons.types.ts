import { ICustomButton } from "../custom-button";

export interface IButtonsProp {
  primary: ICustomButton;
  secondary?: ICustomButton;
  destructive?: ICustomButton;
}
