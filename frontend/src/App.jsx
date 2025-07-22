import React, { Suspense, useState, useEffect } from "react";
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
import { Layout } from "./component/Layout/Layout";
import UnauthPage from "./component/Unauthorized/UnauthPage";

const App = () => {
  // --- 1. Add state ---
  const [userLevel, setUserLevel] = useState(
    parseInt(localStorage.getItem("userLevel") || "999", 10)
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // --- 2. Sync state to localStorage on change ---
  useEffect(() => {
    localStorage.setItem("userLevel", userLevel);
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [userLevel, isLoggedIn]);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <Login
                setUserLevel={setUserLevel}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
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
                <Layout userLevel={userLevel}>
                  <DashboardCards />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/company"
            element={
              <LevelProtectedRoute requiredLevel={1} userLevel={userLevel}>
                <Layout userLevel={userLevel}>
                  <Company />
                </Layout>
              </LevelProtectedRoute>
            }
          />

          <Route
            path="/office"
            element={
              <LevelProtectedRoute requiredLevel={1} userLevel={userLevel}>
                <Layout userLevel={userLevel}>
                  <Office />
                </Layout>
              </LevelProtectedRoute>
            }
          />

          <Route
            path="/allocation"
            element={
              <LevelProtectedRoute requiredLevel={2} userLevel={userLevel}>
                <Layout userLevel={userLevel}>
                  <OfficeAllocation />
                </Layout>
              </LevelProtectedRoute>
            }
          />

          <Route
            path="/complain-category"
            element={
              <LevelProtectedRoute requiredLevel={1} userLevel={userLevel}>
                <Layout userLevel={userLevel}>
                  <ComplainCategory />
                </Layout>
              </LevelProtectedRoute>
            }
          />

          <Route
            path="/complain-sub-category/:categoryId?"
            element={
              <LevelProtectedRoute requiredLevel={1} userLevel={userLevel}>
                <Layout userLevel={userLevel}>
                  <ComplainSubCategory />
                </Layout>
              </LevelProtectedRoute>
            }
          />

          <Route
            path="/usertype"
            element={
              <Layout userLevel={userLevel}>
                <UserType />
              </Layout>
            }
          />

          <Route
            path="/users"
            element={
              <Layout userLevel={userLevel}>
                <User />
              </Layout>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
