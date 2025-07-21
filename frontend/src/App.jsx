import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Component Imports
import { Login } from "./component/Login";
import { DashboardCards } from "./component/DashboardCards/DashboardCards";
import ProtectedRoute from "./component/Protected/ProtectedRoute";
import { LevelProtectedRoute } from "./component/LevelProtected/LevelProtectedRoute";
import Loading from "./component/Loading/Loading";

const User = React.lazy(() => import("./component/UserData/User"));
const Company = React.lazy(() => import("./component/Setup/Company/Company"));
const Office = React.lazy(() => import("./component/Setup/Office/Office"));
const OfficeAllocation = React.lazy(() =>
  import("./component/Setup/OfficeAllocation/OfficeAllocation")
);
const ComplainCategory = React.lazy(() =>
  import("./component/Setup/ComplainCategory/ComplainCategory")
);
const ComplainSubCategory = React.lazy(() =>
  import("./component/Setup/ComplainSubCategory/ComplainSubCategory")
);
const UserType = React.lazy(() => import("./component/UserType/UserType"));

// import SubCategoryPage from './component/Setup/ComplainSubCategory/SubCategoryPage';
import { Layout } from "./component/Layout/Layout";
import UnauthPage from "./component/Unauthorized/UnauthPage";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userLevel = parseInt(localStorage.getItem("userLevel") || "999", 10);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<UnauthPage />} />

          {/* Redirect from root */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Common Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardCards />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/company"
            element={
              <LevelProtectedRoute requiredLevel={1}>
                <Layout>
                  <Company />
                </Layout>
              </LevelProtectedRoute>
            }
          />

          <Route
            path="/office"
            element={
              <LevelProtectedRoute requiredLevel={1}>
                <Layout>
                  <Office />
                </Layout>
              </LevelProtectedRoute>
            }
          />

          <Route
            path="/allocation"
            element={
              <LevelProtectedRoute requiredLevel={2}>
                <Layout>
                  <OfficeAllocation />
                </Layout>
              </LevelProtectedRoute>
            }
          />

          <Route
            path="/complain-category"
            element={
              <LevelProtectedRoute requiredLevel={1}>
                <Layout>
                  <ComplainCategory />
                </Layout>
              </LevelProtectedRoute>
            }
          />

          <Route
            path="/complain-sub-category/:categoryId?"
            element={
              <LevelProtectedRoute requiredLevel={1}>
                <Layout>
                  <ComplainSubCategory />
                </Layout>
              </LevelProtectedRoute>
            }
          />

          <Route
            path="/usertype"
            element={
              // <LevelProtectedRoute requiredLevel={1}>
              <Layout>
                <UserType />
              </Layout>
              // </LevelProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              // <LevelProtectedRoute requiredLevel={1}>
              <Layout>
                <User />
              </Layout>
              // </LevelProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
