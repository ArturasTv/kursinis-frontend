import { Route, Routes } from "react-router-dom";
import Layout from "../layout/layout";
import Home from "../pages/home/home";
import Play from "../pages/play/play";
import RegisterPage from "../pages/registerPage/registerPage";
import LoginPage from "../pages/loginPage/loginPage";
import PrivateRoute from "../navigation/privateRoute/privateRoute";
import PublicRoute from "../navigation/privateRoute/publicRoute";
import TablesPage from "../pages/tablesPage/tablesPage";
import CreateGamePage from "../pages/createGamePage/createGamePage";
import StatisticsPage from "../pages/statisticsPage/statisticsPage";
import Logout from "../pages/logout/logout";
const Webpages = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
          exact
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
          exact
        />
        <Route
          path="/play"
          element={
            <PrivateRoute>
              <Play />
            </PrivateRoute>
          }
          exact
        />
        <Route
          path="/tables"
          element={
            <PrivateRoute>
              <TablesPage />
            </PrivateRoute>
          }
          exact
        />
        <Route
          path="/logout"
          element={
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          }
          exact
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateGamePage />
            </PrivateRoute>
          }
          exact
        />
        <Route path="/stats" element={<StatisticsPage />} exact />
      </Routes>
    </Layout>
  );
};

export default Webpages;
