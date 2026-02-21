import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';

const FrontendLayout = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};
export default FrontendLayout;
