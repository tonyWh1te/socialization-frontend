import { Outlet } from 'react-router-dom';
import Header from '../../Header/Header';

const PageLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>
);

export default PageLayout;
