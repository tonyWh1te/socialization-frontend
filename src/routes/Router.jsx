import { Route, Routes } from 'react-router-dom';
import { Home, Users, Components, Organizations, Profile, Auth } from '../pages';
import { Layout } from '../components';
import ROUTES from './RouterConfig';

const Router = () => (
  <Routes>
    <Route
      path={ROUTES.Auth}
      element={<Auth />}
    />
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
  </Routes>
);

export default Router;
