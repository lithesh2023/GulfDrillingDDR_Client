import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useSelector} from 'react-redux'

const PrivateRoute = () => {
  const user = useSelector((state) => state.user.user)
  return user.name ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
