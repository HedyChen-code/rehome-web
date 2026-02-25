import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';

const FrontendLayout = ({ navbarVariant }) => {
  return (
    <div>
      <Navbar variant={navbarVariant} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default FrontendLayout;
