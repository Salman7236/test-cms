import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

// Component Imports
import { Login } from './component/Login';
import { DashboardCards } from './component/DashboardCards/DashboardCards';
import ProtectedRoute from './component/Protected/ProtectedRoute';
import { RoleProtectedRoute } from './component/RoleProtected/RoleProtectedRoute';
import Loading from './component/Loading/Loading';

const User = React.lazy(() => import('./component/UserData/User'));
const Company = React.lazy(() => import('./component/Setup/Company/Company'));
const Office = React.lazy(() => import('./component/Setup/Office/Office'));
const OfficeAllocation = React.lazy(() => import('./component/Setup/OfficeAllocation/OfficeAllocation'));
const ComplainCategory = React.lazy(() => import('./component/Setup/ComplainCategory/ComplainCategory'));
const ComplainSubCategory = React.lazy(() => import('./component/Setup/ComplainSubCategory/ComplainSubCategory'));
const UserType = React.lazy(() => import('./component/UserType/UserType'));

// import SubCategoryPage from './component/Setup/ComplainSubCategory/SubCategoryPage';
import { Layout } from './component/Layout/Layout';
import UnauthPage from './component/Unauthorized/UnauthPage';

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole") || 'user';

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<UnauthPage />} />

          {/* Redirect from root */}
          <Route path="/" element={
            isLoggedIn
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/login" replace />
          } />

          {/* Common Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <DashboardCards />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Admin Protected Routes */}
          <Route path="/company" element={
            <RoleProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <Company />
              </Layout>
            </RoleProtectedRoute>
          } />

          <Route path="/office" element={
            <RoleProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <Office />
              </Layout>
            </RoleProtectedRoute>
          } />

          <Route path="/allocation" element={
            <RoleProtectedRoute allowedRoles={['admin', 'coordinator']}>
              <Layout>
                <OfficeAllocation />
              </Layout>
            </RoleProtectedRoute>
          } />

          <Route path="/complain-category" element={
            <RoleProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <ComplainCategory />
              </Layout>
            </RoleProtectedRoute>
          } />
          

           <Route path="/complain-sub-category/:categoryId?" element={
            <RoleProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <ComplainSubCategory />
                {/* <SubCategoryPage /> */}
              </Layout>
            </RoleProtectedRoute>
          } 
          /> 

          <Route path="/usertype" element={
            <RoleProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <UserType />
              </Layout>
            </RoleProtectedRoute>
          } />

          <Route path="/users" element={
            <RoleProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <User />
              </Layout>
            </RoleProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;