import { Outlet, useLocation } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';

const FrontendLayout = () => {
  const { pathname } = useLocation();
  const isBgGrayFooterPage = 
    ( pathname === '/checkout/detail' ) || ( pathname === '/cart' );

  return (
    <div className={ isBgGrayFooterPage ? 'bg-gray-footer-page' : ' '}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default FrontendLayout;
