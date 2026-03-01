import { Outlet, NavLink } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const NavItems = () => {
  return (
    <ul className="nav d-flex flex-column p-4 flex-grow-1">
      <li className="nav-item">
        <NavLink className="nav-link text-white" to="/admin">
          <i className="bi bi-house-door me-2"></i> 後臺首頁
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link text-white" to="/admin/products">
          <i className="bi bi-box-seam me-2"></i> 商品列表
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link text-white" to="/admin/orders">
          <i className="bi bi-receipt me-2"></i> 訂單列表
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link text-white" to="/admin/TradeList">
          <i className="bi bi-clipboard-data me-2"></i> 家具收購申請清單
        </NavLink>
      </li>
      <li className="nav-item mt-auto">
        <NavLink className="nav-link text-white" to="/">
          <i className="bi bi-box-arrow-left me-2"></i> 回到前台
        </NavLink>
      </li>
    </ul>
  );
};

const AdminLayout = () => {
  const navigate = useNavigate();

  // 登出
  const checkLoggOut = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/logout`);

      // 移除 token
      document.cookie = 'hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      delete axios.defaults.headers.common.Authorization;
      toast.success(res.data.message);
      setTimeout(() => {
        navigate('/admin/login');
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="d-flex ">
      <Toaster position="top-center" reverseOrder={false} />
      {/* --- 左側側邊欄 (Sidebar) --- */}
      <aside
        className="d-flex flex-column position-fixed min-vh-100 text-white bg-primary-90"
        style={{
          width: '240px',
        }}
      >
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
      <div
        className="d-flex flex-column flex-grow-1"
        style={{
          marginLeft: '240px', // 必須等於 aside 的寬度，避免被遮住
        }}
      >
        {/* 右側上方可以放一個簡單的頂欄，顯示登出按鈕等 */}
        <header className="py-5 px-8 shadow-sm d-flex justify-content-between align-items-center">
          <span>歡迎回來，管理員</span>
          <button
            className="btn btn-primary-90"
            type="button"
            onClick={checkLoggOut}
          >
            登出
          </button>
        </header>

        <main className="m-0 p-10 flex-grow-1">
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
