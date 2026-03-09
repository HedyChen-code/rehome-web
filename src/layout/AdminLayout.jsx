import { Outlet, NavLink } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MessageToast from '../components/MessageToast';
import useMessage from '../hooks/useMessage';
import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const NavItems = ({ close }) => {
  return (
    <div className="offcanvas-body py-5 px-4 d-flex">
      <ul className="nav d-flex align-items-center align-items-lg-start flex-column p-4 flex-grow-1">
        <li className="nav-item admin-nav">
          <NavLink className="nav-link" to="/admin" onClick={close} end>
            <i className="bi bi-house-door me-2"></i> 後臺首頁
          </NavLink>
        </li>
        <li className="nav-item admin-nav">
          <NavLink className="nav-link" to="/admin/products" onClick={close}>
            <i className="bi bi-box-seam me-2"></i> 商品列表
          </NavLink>
        </li>
        <li className="nav-item admin-nav">
          <NavLink className="nav-link" to="/admin/orders" onClick={close}>
            <i className="bi bi-receipt me-2"></i> 訂單列表
          </NavLink>
        </li>
        <li className="nav-item admin-nav">
          <NavLink className="nav-link" to="/admin/TradeList" onClick={close}>
            <i className="bi bi-clipboard-data me-2"></i> 家具收購申請清單
          </NavLink>
        </li>
        <li className="nav-item admin-nav mt-auto">
          <NavLink className="nav-link" to="/" onClick={close}>
            <i className="bi bi-box-arrow-left me-2"></i> 回到前台
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useMessage();
  // 手機板-漢堡選單
  const [isOpen, setIsOpen] = useState(false);
  // 監聽滾輪
  const [isScrolled, setIsScrolled] = useState(false);

  // 監聽滾輪
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // 50px 就觸發
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // LOGO會用到的圖片
  const logoSrcMap = {
    homeSmall: 'images/logo/logo v2_white.svg',
    default: 'images/logo/logo v2.svg',
  };
  let logoSrc;
  logoSrc = isScrolled ? logoSrcMap.homeSmall : logoSrcMap.default;

  // 登出
  const checkLoggOut = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/logout`);

      // 移除 token
      document.cookie = 'hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      delete axios.defaults.headers.common.Authorization;
      showSuccess(res.data.message);
      setTimeout(() => {
        navigate('/admin/login');
      }, 1000);
    } catch (error) {
      showError(error.response?.data?.message);
    }
  };

  return (
    <div className="d-flex ">
      <MessageToast />
      {/* --- 左側側邊欄 (Sidebar) --- */}
      <aside className="d-none d-lg-flex w-lg-240 flex-column position-fixed min-vh-100 h-100 text-white bg-primary-90">
        <div className="p-7 fw-bold border-bottom border-gray-20 d-flex justify-content-around align-items-end">
          <img
            src="images/logo/logo v2_white.svg"
            alt="LOGO"
            style={{
              width: '50px',
            }}
          />
          <div>
            <h6>管理後台</h6>
          </div>
        </div>
        <NavItems />
      </aside>

      {/* --- 右側內容區 (Main Content) --- */}
      <div className="ms-0 ms-lg-240 d-flex flex-column flex-grow-1">
        {/* 右側上方可以放一個簡單的頂欄，顯示登出按鈕等 */}
        {/* 電腦版 */}
        <header className="py-5 px-8 shadow-sm d-none d-lg-flex justify-content-between align-items-center">
          <span>歡迎回來，管理員</span>
          <button
            className="btn btn-primary-90"
            type="button"
            onClick={checkLoggOut}
          >
            登出
          </button>
        </header>
        {/* 手機板 */}
        <header className="d-lg-none" style={{ marginBottom: '80px' }}>
          {/* 手機版導覽列 */}
          <nav
            className={`navbar navbar-light fixed-top d-lg-none p-4
            ${isScrolled ? 'bg-primary-90 bg-opacity-75' : ''}  `}
          >
            <div className="container-fluid align-items-start p-0">
              <NavLink className="" to="/admin">
                <img src={logoSrc} alt="logo" className="logo-img logo-small" />
              </NavLink>

              <div className="d-flex">
                {/* 漢堡選單 */}
                <button
                  className="navbar-toggler rounded-circle bg-white p-5  border-0  shadow-none wh-56"
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <div className="hamburger-icon ">
                    <span className="line"></span>
                    <span className="line middle"></span>
                    <span className="line"></span>
                  </div>
                </button>
              </div>

              <div
                className={`offcanvas offcanvas-top h-100 bg-primary-10
               ${isOpen ? 'show' : ''}`}
                style={{ visibility: isOpen ? 'visible' : 'hidden' }}
              >
                <div className={`justify-content-end p-4 ${'d-flex'}`}>
                  <button
                    className="rounded-circle bg-white p-5 border-0"
                    onClick={() => setIsOpen(false)}
                  >
                    <i className="bi bi-x nav-icon"></i>
                  </button>
                </div>
                <NavItems isOpen={isOpen} close={() => setIsOpen(false)} />
              </div>
            </div>
          </nav>
        </header>

        <main className="m-0 p-5 p-lg-10 flex-grow-1 w-100">
          <Outlet />
        </main>

        <footer className="py-3 text-center border-top border-gray-20">
          <p className="mb-0 text-muted">
            &copy; 2025 物拾 Re: home. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
