import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Lender } from "../../types";
import { FlexCol } from "../display";
import { Body2, H6 } from "../typography";

export const LenderCard = ({ details }: { details: Lender }) => {
  const monthly = `Monthly Repayment: $${details.monthly}`;
  const rate = `Interest Rate: ${details.interest}% APR`;
  const fees = `Fees: ${details.fee ? details.fee : "No fees"}`;

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={details.image}
          alt={`${details.name} image`}
        />
        <CardContent>
          <FlexCol gap={1}>
            <H6>{details.name}</H6>
            <Body2>{monthly}</Body2>
            <Body2>{rate}</Body2>
            <Body2>{fees}</Body2>
          </FlexCol>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
