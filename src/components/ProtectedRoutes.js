import React from 'react'
import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const ProtectedRoutes = () => {
  const auth = useContext(UserContext);
  const location = useLocation();
  return (
    <>
        {auth?.user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />}
    </>
  )
}

export default ProtectedRoutes