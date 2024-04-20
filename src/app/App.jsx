import Router from '../routes/Router';
import { AuthInit } from '../modules/Auth';

const App = () => (
  <AuthInit>
    <Router />
  </AuthInit>
);

export default App;
