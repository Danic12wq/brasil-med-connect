
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  requiredUserType?: 'patient' | 'doctor' | 'admin';
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requiredUserType,
  children 
}) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();
  
  // Show nothing while checking authentication
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific user type is required, check it
  if (requiredUserType && user?.user_type !== requiredUserType) {
    // Redirect patients to patient dashboard and doctors to doctor dashboard
    if (user?.user_type === 'patient') {
      return <Navigate to="/dashboard" replace />;
    } else if (user?.user_type === 'doctor') {
      return <Navigate to="/doctor/dashboard" replace />;
    } else {
      // Fallback to home page
      return <Navigate to="/" replace />;
    }
  }

  // Return outlet or children so nested routes can be rendered
  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;
