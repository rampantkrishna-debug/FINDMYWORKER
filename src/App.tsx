import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ProtectedRoute } from './components/common/ProtectedRoute';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { CustomerLoginPage } from './pages/CustomerLoginPage';
import { CustomerRegisterPage } from './pages/CustomerRegisterPage';
import { WorkerLoginPage } from './pages/WorkerLoginPage';
import { WorkerRegisterPage } from './pages/WorkerRegisterPage';
import { BookingCheckoutPage } from './pages/BookingCheckoutPage';
import { BookingTrackingPage } from './pages/BookingTrackingPage';
import { CustomerDashboardPage } from './pages/CustomerDashboardPage';
import { WorkerDashboardPage } from './pages/WorkerDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B192C]">
            {/* Global Navbar */}
            <Navbar />

            {/* Main Page Content */}
            <main className="flex-1">
              <Routes>
                {/* Public Information Pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServiceDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />

                {/* Authentication Entry Pages */}
                <Route path="/customer/login" element={<CustomerLoginPage />} />
                <Route path="/customer/register" element={<CustomerRegisterPage />} />
                <Route path="/worker/login" element={<WorkerLoginPage />} />
                <Route path="/worker/register" element={<WorkerRegisterPage />} />

                {/* Protected Customer Routes */}
                <Route
                  path="/customer/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['customer', 'admin']}>
                      <CustomerDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/booking/:slug"
                  element={
                    <ProtectedRoute allowedRoles={['customer', 'admin']} fallbackLoginUrl="/customer/login">
                      <BookingCheckoutPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/booking/status/:id"
                  element={
                    <ProtectedRoute allowedRoles={['customer', 'worker', 'admin']}>
                      <BookingTrackingPage />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Worker Routes */}
                <Route
                  path="/worker/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['worker', 'admin']} fallbackLoginUrl="/worker/login">
                      <WorkerDashboardPage />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Console */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute fallbackLoginUrl="/customer/login">
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />
          </div>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
