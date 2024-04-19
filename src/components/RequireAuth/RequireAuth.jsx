import { useState } from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../modules/AuthForm';

/**
 * Маршрутизаиця пользователя в зависимости от роли и авторизации
 */
const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/auth"
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuth;
