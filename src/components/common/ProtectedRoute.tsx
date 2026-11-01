import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  fallbackLoginUrl?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  fallbackLoginUrl
}) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();

  // Show clean spinner while hydrating Supabase session
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-semibold tracking-wide">
          Verifying FindMyWorker secure session...
        </p>
      </div>
    );
  }

  // If user is not authenticated, redirect to appropriate login page and preserve destination
  if (!currentUser) {
    const isWorkerRoute = allowedRoles?.length === 1 && allowedRoles[0] === 'worker';
    const loginTarget = fallbackLoginUrl || (isWorkerRoute ? '/worker/login' : '/customer/login');

    return <Navigate to={loginTarget} state={{ from: location.pathname }} replace />;
  }

  // If roles are restricted and user doesn't have an allowed role, redirect to their home dashboard
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    if (currentUser.role === 'customer') {
      return <Navigate to="/customer/dashboard" replace />;
    } else if (currentUser.role === 'worker') {
      return <Navigate to="/worker/dashboard" replace />;
    } else if (currentUser.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

