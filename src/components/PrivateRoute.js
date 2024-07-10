import React from 'react';
import { Navigate, Outlet ,useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux'

const PrivateRoute = () => {
  const user = useSelector((state) => state.user.user)
  const location = useLocation();
  return user.name ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace/>;
};

export default PrivateRoute;
