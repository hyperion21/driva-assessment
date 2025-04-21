import { Grid } from "@mui/material";
import { Lender } from "../../types";
import { LenderCard } from "../lender-card";

interface ILenderList {
  lenders: Lender[];
}

export const LenderList = ({ lenders }: ILenderList) => {
  return (
    <Grid container spacing={2}>
      {lenders.map((lender) => (
        <Grid key={lender.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <LenderCard details={lender} />
        </Grid>
      ))}
    </Grid>
  );
};
