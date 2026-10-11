import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardLayout } from './pages/DashboardLayout';
import { DashboardOverview } from './pages/DashboardOverview';
import { DashboardAppointments } from './pages/DashboardAppointments';
import { DashboardServices } from './pages/DashboardServices';
import { DashboardStaff } from './pages/DashboardStaff';
import { DashboardSchedule } from './pages/DashboardSchedule';
import { DashboardBranding } from './pages/DashboardBranding';
import { DashboardSettings } from './pages/DashboardSettings';
import { PublicBookingPage } from './pages/PublicBookingPage';
import { BookingConfirmedPage } from './pages/BookingConfirmedPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-8 text-center text-slate-500">Chargement...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/book/:slug" element={<PublicBookingPage />} />
      <Route path="/booking/confirmed/:reference" element={<BookingConfirmedPage />} />

      {/* Onboarding */}
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <OnboardingPage />
          </ProtectedRoute>
        }
      />

      {/* Owner Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="appointments" element={<DashboardAppointments />} />
        <Route path="services" element={<DashboardServices />} />
        <Route path="staff" element={<DashboardStaff />} />
        <Route path="schedule" element={<DashboardSchedule />} />
        <Route path="branding" element={<DashboardBranding />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
