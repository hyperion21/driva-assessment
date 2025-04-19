import Stack, { StackProps } from "@mui/material/Stack";

const Flex = (props: StackProps) => {
  return <Stack {...props} />;
};

export const FlexRow = (props: StackProps) => {
  return <Flex direction="row" {...props} />;
};
export const FlexCol = (props: StackProps) => {
  return <Flex direction="column" {...props} />;
};
