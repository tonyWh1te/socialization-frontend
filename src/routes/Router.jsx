import { Route, Routes } from 'react-router-dom';
import { Home, Users, Components, Organizations, Profile, AuthPage } from '../pages';
import { Layout, RequireAuth } from '../components';
import { ROUTES, ROLES } from './RouterConfig';

const Router = () => (
  <Routes>
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
    <Route element={<Layout />}>
      <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Tutor, ROLES.Observed]} />}>
        <Route
          index
          path={ROUTES.Home}
          element={<Home />}
        />
        <Route
          path={ROUTES.Components}
          element={<Components />}
        />
        <Route
          path={ROUTES.Profile}
          element={<Profile />}
        />
        <Route
          path={ROUTES.Organizations}
          element={<Organizations />}
        />
      </Route>

      <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Tutor]} />}>
        <Route
          path={ROUTES.Users}
          element={<Users />}
        />
      </Route>
    </Route>
  </Routes>
);

export default Router;
