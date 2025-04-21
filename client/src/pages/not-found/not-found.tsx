import { useNavigate } from "react-router-dom";
import { Body1, CustomButton, FlexCol, H1, H5 } from "../../components";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <FlexCol gap={2}>
      <H1>404</H1>
      <H5>Oops! The page you're looking for doesn't exist.</H5>
      <Body1>
        It might have been moved or deleted. Try going back to the homepage.
      </Body1>
      <CustomButton
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        text="Home"
        sx={{ width: "fit-content" }}
      />
    </FlexCol>
  );
};
