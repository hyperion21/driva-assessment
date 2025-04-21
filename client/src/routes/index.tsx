import { LoanApplication, NotFound } from "../pages";

const routes = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <LoanApplication />,
  },
];

export default routes;
