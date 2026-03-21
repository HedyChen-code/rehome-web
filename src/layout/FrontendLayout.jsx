import { Outlet, useLocation } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../components/ScrollToTop';
import MessageToast from '../components/MessageToast';

const FrontendLayout = ({ navbarVariant }) => {
  const { pathname } = useLocation();
  const isBgGrayFooterPage =
    pathname === '/checkout' || pathname === '/cart';

  return (
    <div className={isBgGrayFooterPage ? 'bg-gray-footer-page' : ' '}>
      <Navbar variant={navbarVariant} />
      <main>
        <MessageToast />
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};
export default FrontendLayout;
