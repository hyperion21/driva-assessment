import { useRoutes } from "react-router-dom";
import routes from "./routes";

const App = () => {
  const Routes = () => {
    const appRoutes = useRoutes(routes);
    return appRoutes;
  };

  return <Routes />;
};

export default App;
