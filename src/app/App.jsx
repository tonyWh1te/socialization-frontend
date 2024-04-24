import Router from '../routes/Router';
import { AuthInit } from '../modules/Auth';
import { ToastContainer } from '../UI';

const App = () => (
  <>
    <AuthInit>
      <Router />
    </AuthInit>
    <ToastContainer />
  </>
);

export default App;
