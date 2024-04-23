import { Route, Routes } from 'react-router-dom';
import { Home, Users, Games, Tests, Profile, AuthPage } from '../pages';
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
          path={ROUTES.Games}
          element={<Games />}
        />
        <Route
          path={ROUTES.Tests}
          element={<Tests />}
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
