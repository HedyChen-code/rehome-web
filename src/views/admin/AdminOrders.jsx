import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as bootstrap from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import useMessage from '../../hooks/useMessage';
import Pagination from '../../components/Pagination';
import OrderModal from '../../components/OrderModal';
import AdminSingleOrder from './AdminSingleOrder';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const INITIAL_TEMPLATE_DATA = {
  create_at: 0,
  id: '',
  is_paid: false,
  num: 0,
  products: {},
  total: 0,
  user: {
    address: '',
    email: '',
    message: '', // 這裡對應 API 的 message
    name: '',
    tel: '',
  },
};

const AdminOrders = () => {
  const navigate = useNavigate();
  // 所有產品資料
  const [orders, setOrders] = useState([]);
  // 可以查看的單一產品
  const [tempOrder, setTempOrder] = useState(null);
  //分頁
  const [pagination, setPagination] = useState({});
  // useRef 建立對 DOM 元素的參照
  const orderModalRef = useRef(null);
  const [modalType, setModalType] = useState(''); // "create", "edit", "delete"
  // 訂單表單資料模板
  const [templateData, setTemplateData] = useState(INITIAL_TEMPLATE_DATA);
  const { showError } = useMessage();
  const [isLoading, setIsLoading] = useState(true);

  // 取得所有訂單資料
  const getOrders = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/orders?page=${page}`,
      );
      setOrders(res.data.orders);
      setPagination(res.data.pagination);
    } catch (error) {
      showError(error.response?.data?.message || '取得資料失敗');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );

    if (!token) {
      navigate('/'); // 沒 token 直接踢回登入頁
      return;
    }
    axios.defaults.headers.common.Authorization = token;

    // 初始化 Modal (只在掛載時執行一次)
    if (!orderModalRef.current) {
      orderModalRef.current = new bootstrap.Modal('#orderModal', {
        keyboard: false,
      });
    }

    const checkAdmin = async () => {
      try {
        await axios.post(`${API_BASE}/api/user/check`);
        getOrders(); // 驗證成功後抓資料
      } catch (err) {
        showError(err.response?.data?.message || '驗證失敗');
        navigate('/');
      }
    };

    checkAdmin();
  }, [navigate, getOrders]);

  // 使用 ref 控制 Modal
  const openModal = (product, type) => {
    setModalType(type);

    setTemplateData({
      ...INITIAL_TEMPLATE_DATA,
      ...product,
    });
    orderModalRef.current.show();
  };
  const closeModal = () => {
    orderModalRef.current.hide();
    setTemplateData(INITIAL_TEMPLATE_DATA);
  };

  return (
    <>
      <h2 className="my-5">訂單列表</h2>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>建立時間</th>
              <th>訂單編號</th>
              <th>客戶姓名 / Email</th>
              <th>購買項目</th>
              <th>應付金額</th>
              <th className="text-center">付款狀態</th>
              <th className="text-center">查看細節</th>
              <th className="text-center">修改</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // 1. 載入中的狀態
              <tr>
                <td colSpan="8" className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">資料讀取中...</p>
                </td>
              </tr>
            ) : orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  {/* 建立時間 */}
                  <td>
                    {order.create_at
                      ? new Date(order.create_at * 1000).toLocaleDateString()
                      : '無日期資料'}
                  </td>

                  {/* 訂單 ID */}
                  <td className="small text-muted">{order.id}</td>

                  {/* 客戶資料 */}
                  <td>
                    <div className="fw-bold">{order.user.name}</div>
                    <div className="small text-muted">{order.user.email}</div>
                  </td>

                  {/* 產品項目 (處理物件轉陣列) */}
                  <td>
                    <ul className="list-unstyled mb-0 small">
                      {Object.values(order.products).map((item) => (
                        <li key={item.id}>
                          {item.product.title.slice(-5)}...
                          <span className="badge bg-secondary-20 ms-1 text-gray-50">
                            x {item.qty}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* 應付金額 */}
                  <td>{order.total.toLocaleString()} 元</td>

                  {/* 付款狀態 */}
                  <td className="text-center align-middle">
                    {order.is_paid ? (
                      <span className="badge bg-success text-gray-70 rounded-pill fs-8">
                        <i className="bi bi-check-circle-fill"></i>
                        <span className="ms-2">已付款</span>
                      </span>
                    ) : (
                      <span className="badge bg-danger text-gray-70 rounded-pill fs-8">
                        <i className="bi bi-x-circle-fill"></i>
                        <span className="ms-2">未付款</span>
                      </span>
                    )}
                  </td>
                  <td className="text-center align-middle">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setTempOrder(order)}
                    >
                      查看細節
                    </button>
                  </td>

                  {/* 修改 */}
                  <td className="text-center align-middle">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-outline-info btn-sm"
                        onClick={() => openModal(order, 'edit')}
                      >
                        編輯
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => openModal(order, 'delete')}
                      >
                        取消
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-5 text-muted">
                  尚無產品資料
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* 查看單一商品元件 */}
      <AdminSingleOrder tempOrder={tempOrder} setTempOrder={setTempOrder} />

      {/* modal元件 */}
      <OrderModal
        modalType={modalType}
        templateData={templateData}
        closeModal={closeModal}
        getOrders={getOrders}
      />
      {/* 分頁元件 */}
      <Pagination pagination={pagination} getData={getOrders} />
    </>
  );
};
export default AdminOrders;
