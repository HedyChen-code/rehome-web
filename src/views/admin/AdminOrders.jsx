import axios from 'axios';
import { useEffect, useState } from 'react';
import useMessage from '../../hooks/useMessage';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const AdminOrders = () => {
  // 所有產品資料
  const [orders, setOrders] = useState([]);
  const { showError } = useMessage();

  useEffect(() => {
    // 取得所有訂單資料
    const getOrders = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/admin/orders`);
        setOrders(res.data.orders);
        console.log(res.data.orders);
      } catch (error) {
        showError(error.response?.data?.message || '取得資料失敗');
      }
    };
    getOrders();
  }, []);

  return (
    <>
      <h1>訂單列表</h1>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>建立時間</th>
              <th>訂單編號</th>
              <th>客戶姓名 / Email</th>
              <th>購買項目</th>
              <th>應付金額</th>
              <th>付款狀態</th>
              <th>留言</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order.id}>
                  {/* 建立時間 */}
                  <td>{order.create_at}</td>

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
                          ID: {item.product_id.slice(-5)}...
                          <span className="badge bg-secondary ms-1">
                            x {item.qty}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* 應付金額 (範例 JSON 無總金額，通常會由 API 提供或自行加總) */}
                  <td>{order.num} 元</td>

                  {/* 付款狀態 */}
                  <td>
                    {order.is_paid ? (
                      <span className="text-success fw-bold">已付款</span>
                    ) : (
                      <span className="text-danger fw-bold">未付款</span>
                    )}
                  </td>

                  {/* 留言 */}
                  <td className="small">{order.message || '無'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default AdminOrders;
