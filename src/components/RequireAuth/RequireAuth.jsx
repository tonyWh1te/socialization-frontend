import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../modules/AuthForm';

const RequireAuth = () => {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);

  return user?.token ? (
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
