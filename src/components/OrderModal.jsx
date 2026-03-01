import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import useMessage from '../hooks/useMessage';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function OrderModal({ modalType, templateData, closeModal, getOrders }) {
  const [tempData, setTempData] = useState(templateData);
  const { showSuccess } = useMessage();

  useEffect(() => {
    setTempData(templateData);
  }, [templateData]);

  // modal表單輸入處理
  const handleEditOrderChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'is_paid') {
      setTempData((prev) => ({ ...prev, is_paid: checked }));
    }
    // 只處理需要放在 user 物件裡的客戶資訊
    else if (['name', 'email', 'tel', 'address'].includes(name)) {
      setTempData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          [name]: value,
        },
      }));
    }
    // message 以及其他欄位會進到這裡，存放在 tempData 的第一層
    else {
      setTempData((prev) => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value,
      }));
    }
  };

  // 處理商品數量變動
  const handleProductQtyChange = (productId, newQty) => {
    const qty = Math.max(1, Number(newQty));

    setTempData((prev) => {
      // 1. 先複製一份目前的 products
      const updatedProducts = {
        ...prev.products,
        [productId]: {
          ...prev.products[productId],
          qty: qty,
          // 更新該單項商品的小計 (單價 * 數量)
          final_total: prev.products[productId].product.price * qty,
        },
      };

      // 2. 重新計算整筆訂單的總計
      const newTotal = Object.values(updatedProducts).reduce((acc, item) => {
        return acc + item.product?.price * item.qty;
      }, 0);

      // 3. 回傳完整的更新物件
      return {
        ...prev,
        products: updatedProducts,
        total: newTotal, // 這樣送出給後台的 total 才會是正確的
      };
    });
  };
  // 移除單項商品
  const removeProduct = (productId) => {
    setTempData((prev) => {
      // 1. 複製目前的 products 物件
      const updatedProducts = { ...prev.products };

      // 2. 刪除該 id 的商品
      delete updatedProducts[productId];

      // 3. 重新計算總計 (避免刪除後總金額沒變)
      const newTotal = Object.values(updatedProducts).reduce((acc, item) => {
        return acc + item.product?.price * item.qty;
      }, 0);

      return {
        ...prev,
        products: updatedProducts,
        total: newTotal,
      };
    });
  };
  // 更新商品資訊(新增、編輯)
  const updateOrder = async (id) => {
    let url = `${API_BASE}/api/${API_PATH}/admin/order`;
    let method = 'post';

    if (modalType === 'edit') {
      url = `${API_BASE}/api/${API_PATH}/admin/order/${id}`;
      method = 'put';
    }

    const orderData = {
      data: {
        ...tempData,
      },
    };
    try {
      const res = await axios[method](url, orderData);
      showSuccess(res.data.message);
      getOrders();
      closeModal();
    } catch (error) {
      const message =
        error?.response?.data?.message || '資料填寫不完整或發生錯誤';
      alert(message);
    }
  };

  // 刪除商品
  const deleteOrder = async (id) => {
    try {
      const res = await axios.delete(
        `${API_BASE}/api/${API_PATH}/admin/order/${id}`,
      );
      getOrders();
      closeModal();
      toast.success('資料刪除成功:', res.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div
      id="orderModal"
      className="modal"
      tabIndex="-1"
      aria-labelledby="orderModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content border-0">
          <div
            className={`modal-header ${
              modalType === 'delete' ? 'bg-danger' : 'bg-primary-30'
            } text-white`}
          >
            <h5 id="orderModalLabel" className="modal-title">
              <span>
                {modalType === 'delete'
                  ? '取消訂單'
                  : `訂單詳情 (ID: ${tempData.id})`}
              </span>
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {modalType === 'delete' ? (
              <p className="fs-5 p-3">
                確定要取消由{' '}
                <span className="text-danger fw-bold">
                  {tempData.user?.name}
                </span>
                下訂的訂單嗎？
                <br />
                <small className="text-muted">此動作無法復原。</small>
              </p>
            ) : (
              <div className="row g-4">
                {/* 左側：客戶與訂單資訊 (可編輯) */}
                <div
                  className="col-lg-4 border-end d-flex flex-column"
                  style={{ height: '550px' }} // 設定固定高度讓內部滾動生效
                >
                  <h6 className="fw-bold font-noto mb-3 pb-2 border-bottom flex-shrink-0">
                    客戶基本資訊
                  </h6>

                  <div
                    className="flex-grow-1 overflow-y-auto pe-2"
                    style={{ minHeight: 0 }}
                  >
                    <div className="mb-3">
                      <label className="form-label small text-muted">
                        姓名
                      </label>
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        value={tempData.user?.name || ''}
                        onChange={handleEditOrderChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small text-muted">
                        信箱
                      </label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={tempData.user?.email || ''}
                        onChange={handleEditOrderChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small text-muted">
                        電話
                      </label>
                      <input
                        name="tel"
                        type="tel"
                        className="form-control"
                        value={tempData.user?.tel || ''}
                        onChange={handleEditOrderChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small text-muted">
                        下單日期
                      </label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={
                          tempData.create_at
                            ? new Date(
                                tempData.create_at * 1000,
                              ).toLocaleString()
                            : ''
                        }
                        disabled // 日期通常不開放手動修改
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small text-muted">
                        地址
                      </label>
                      <input
                        name="address"
                        type="text"
                        className="form-control"
                        value={tempData.user?.address || ''}
                        onChange={handleEditOrderChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small text-muted">
                        訂單留言
                      </label>
                      <textarea
                        name="message"
                        className="form-control"
                        rows="4"
                        style={{ resize: 'none' }}
                        value={tempData.message || ''}
                        onChange={handleEditOrderChange}
                        placeholder="無留言"
                      />
                    </div>
                  </div>

                  {/* 左側底部：管理區 */}
                  <div className="mt-auto pt-3 border-top flex-shrink-0">
                    <h6 className="fw-bold mb-3 font-noto">訂單管理</h6>
                    <div className="mb-3">
                      <label className="form-label small text-muted">
                        付款狀態
                      </label>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="is_paid"
                          name="is_paid"
                          checked={tempData.is_paid}
                          onChange={handleEditOrderChange}
                        />
                        <label className="form-check-label" htmlFor="is_paid">
                          {tempData.is_paid ? '已付款' : '未付款'}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 右側：商品清單與總計 */}
                <div
                  className="col-lg-8 d-flex flex-column"
                  style={{ height: '550px' }}
                >
                  <h6 className="fw-bold font-noto mb-3 pb-2 border-bottom flex-shrink-0">
                    訂購商品清單
                  </h6>

                  {/* 商品表格區：設定 flex-grow-1 會自動撐開，把下方的總計推到底 */}
                  <div
                    className="flex-grow-1 overflow-y-auto mb-3"
                    style={{ minHeight: 0 }}
                  >
                    <table className="table table-sm table-hover align-middle mb-0">
                      <thead
                        className="table-light sticky-top"
                        style={{ zIndex: 1 }}
                      >
                        <tr>
                          <th className="font-noto">商品名稱</th>
                          <th
                            className="text-end font-noto"
                            style={{ width: '100px' }}
                          >
                            數量
                          </th>
                          <th
                            className="text-end font-noto"
                            style={{ width: '120px' }}
                          >
                            金額
                          </th>
                          <th
                            className="text-center font-noto"
                            style={{ width: '60px' }}
                          >
                            操作
                          </th>
                          {/* 新增這一欄 */}
                        </tr>
                      </thead>
                      <tbody>
                        {tempData.products &&
                          Object.values(tempData.products).map((item) => (
                            <tr key={item.id}>
                              <td>
                                <div className="fw-bold font-noto">
                                  {item.product?.title}
                                </div>
                                <small className="text-muted">
                                  單價：${item.product?.price?.toLocaleString()}
                                </small>
                              </td>
                              <td className="text-end">
                                <div className="input-group input-group-sm">
                                  <input
                                    type="number"
                                    className="form-control text-center"
                                    value={item.qty}
                                    min="1"
                                    onChange={(e) =>
                                      handleProductQtyChange(
                                        item.id,
                                        e.target.value,
                                      )
                                    }
                                  />
                                  <span className="input-group-text">
                                    {item.product?.unit}
                                  </span>
                                </div>
                              </td>
                              <td className="text-primary text-end fw-bold">
                                $
                                {(
                                  item.product?.price * item.qty
                                ).toLocaleString()}
                              </td>
                              <td className="text-center">
                                {/* 新增刪除按鈕 */}
                                <button
                                  type="button"
                                  className="btn btn-outline-danger btn-sm border-0"
                                  onClick={() => removeProduct(item.id)}
                                  title="移除此商品"
                                >
                                  <i className="bi bi-trash"></i> Ｘ
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {/* 總計區塊：永遠在底部 */}
                  <div className="mt-auto pt-3 border-top flex-shrink-0">
                    <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded shadow-sm">
                      <span className="fw-bold font-noto text-black ">
                        總計金額
                      </span>
                      <span className="fs-4 fw-bold text-danger">
                        ${tempData.total?.toLocaleString()}{' '}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer bg-light">
            <button
              type="button"
              className="btn btn-outline-warning"
              onClick={closeModal}
            >
              取消
            </button>
            {modalType === 'delete' ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteOrder(tempData.id)}
              >
                確認
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => updateOrder(tempData.id)}
              >
                儲存修改
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderModal;
