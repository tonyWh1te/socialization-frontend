import { Route, Routes } from 'react-router-dom';
import { Home, Users, Components, Organizations, Profile, AuthPage } from '../pages';
import { Layout, RequireAuth } from '../components';
import ROUTES from './RouterConfig';

const Router = () => (
  <Routes>
    {/* public routes */}
    <Route
      path={ROUTES.Auth}
      element={<AuthPage />}
    />

    {/* private routes */}
    <Route element={<RequireAuth />}>
      <Route element={<Layout />}>
        <Route
          index
          path={ROUTES.Home}
          element={<Home />}
        />
        <Route
          path={ROUTES.Users}
          element={<Users />}
        />
        <Route
          path={ROUTES.Components}
          element={<Components />}
        />
        <Route
          path={ROUTES.Organizations}
          element={<Organizations />}
        />
        <Route
          path={ROUTES.Profile}
          element={<Profile />}
        />
      </Route>
    </Route>
  </Routes>
);

export default Router;
