import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DemoPage } from './pages/DemoPage';
import { LoginPage } from './pages/LoginPage';
import { CompleteProfilePage } from './pages/CompleteProfilePage';
import { OTPVerificationPage } from './pages/OTPVerificationPage';
import { DashboardPage } from './pages/DashboardPage';
import { ServicesPage } from './pages/ServicesPage';
import { RequestsPage } from './pages/RequestsPage';
import { CreateRequestPage } from './pages/CreateRequestPage';
import { RequestDetailsPage } from './pages/RequestDetailsPage';
import { ProfilePage } from './pages/ProfilePage';
import { getSession } from './utils/session';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const session = getSession();
  return session ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/complete-profile" element={<CompleteProfilePage />} />
        <Route path="/verify-otp" element={<OTPVerificationPage />} />
        
        <Route path="/" element={<PrivateRoute element={<Layout />} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="requests" element={<RequestsPage />} />
          <Route path="requests/new" element={<CreateRequestPage />} />
          <Route path="requests/:id" element={<RequestDetailsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;