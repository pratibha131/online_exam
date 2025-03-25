import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user && user.email === 'yashmittal4949@gmail.com' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminProtectedRoute;