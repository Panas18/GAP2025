import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard-page";
import { CityPage } from "./pages/city-page";

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/city/:cityName", element: <CityPage /> },
];

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
