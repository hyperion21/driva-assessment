import Box from "@mui/material/Box";
import { LoanApplication } from "../pages";

const routes = [
  {
    path: "*",
    element: <Box />,
  },
  {
    path: "/",
    element: <LoanApplication />,
  },
];

export default routes;
