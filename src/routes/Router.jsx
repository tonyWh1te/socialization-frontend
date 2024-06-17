import { Route, Routes, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  Games,
  Tests,
  Profile,
  AuthPage,
  EditTest,
  PassTest,
  PlayGame,
} from '../pages';
import { RequireAuth } from '../components';
import { PageLayout } from '../UI';
import { ROUTES } from './RouterConfig';
import { ROLES } from '../utils/constants';

const Router = () => {
  const location = useLocation();

  return (
    <Routes
      location={location}
      key={location.pathname}
    >
      {/* public routes */}
      <Route
        path={ROUTES.Auth}
        element={<AuthPage />}
      />

      <Route
        path={ROUTES.Unathorized}
        element={<p>Для вашей роли нет доступа к этой странице</p>}
      />

      {/* private routes */}
      <Route element={<PageLayout />}>
        <Route
          element={<RequireAuth allowedRoles={[ROLES.administrator.code, ROLES.tutor.code]} />}
        >
          <Route
            path={ROUTES.EditTest}
            element={<EditTest />}
          />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES.administrator.code, ROLES.tutor.code, ROLES.observed.code]}
            />
          }
        >
          <Route
            index
            path={ROUTES.Home}
            element={<Home />}
          />
          <Route
            path={ROUTES.Games}
            element={<Games />}
          />
          <Route
            path={ROUTES.Profile}
            element={<Profile />}
          />
          <Route
            path={ROUTES.Tests}
            element={<Tests />}
          />
          <Route
            path={ROUTES.PassingTest}
            element={<PassTest />}
          />
          <Route
            path={ROUTES.PlayingGame}
            element={<PlayGame />}
          />
        </Route>

        <Route
          element={<RequireAuth allowedRoles={[ROLES.administrator.code, ROLES.tutor.code]} />}
        >
          <Route
            path={ROUTES.Users}
            element={<Users />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
