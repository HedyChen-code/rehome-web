import { useEffect, useState, useRef } from 'react';
import { tradeApi } from '../../api/tradeApi';
import useMessage from '../../hooks/useMessage';
import AdminSingleTrade from './AdminSingleTrade';
import * as bootstrap from 'bootstrap';
import TradeModal from '../../components/TradeModal';

function AdminTradeList() {
  const [tradeList, setTradeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showError, showSuccess } = useMessage();
  const [tempTrade, setTempTrade] = useState(null);
  const [viewTrade, setViewTrade] = useState(null);
  const deleteTradeModalRef = useRef(null);
  const viewTradeModalRef = useRef(null);

  useEffect(() => {
    // 初始化查看用的 Modal
    const viewEl = document.getElementById('viewTradeModal');
    if (viewEl) {
      viewTradeModalRef.current = new bootstrap.Modal(viewEl);
    }
  }, []);

  const openViewModal = (item) => {
    setTempTrade(item);
    viewTradeModalRef.current.show();
  };

  // 1. 取得資料
  const fetchTradeList = async () => {
    try {
      setIsLoading(true);
      const result = await tradeApi.getTrades(); // 這裡拿到的是 GAS 回傳的完整物件

      // 檢查結構並存入 data 陣列
      if (result && result.status === 'success' && Array.isArray(result.data)) {
        setTradeList(result.data);
        showSuccess('資料讀取成功');
      } else {
        // 處理後端回傳 status 為 error 的情況
        setTradeList([]);
        showError(result.message || '資料格式錯誤');
      }
    } catch (error) {
      showError('資料讀取失敗，請檢查網路或 CORS 設定');
    } finally {
      setIsLoading(false);
    }
  };

  // 打開刪除 Modal
  const openDeleteModal = (item) => {
    setTempTrade(item);
    deleteTradeModalRef.current.show();
  };

  // 關閉刪除 Modal
  const closeDeleteModal = () => {
    deleteTradeModalRef.current.hide();
  };

  // 執行刪除
  const handleDelete = async (id) => {
    try {
      await tradeApi.deleteTrade(id);
      showSuccess('刪除成功');
      closeDeleteModal(); // 刪除完關閉
      fetchTradeList(); // 刷新列表
    } catch (error) {
      showError('刪除失敗');
    }
  };
  useEffect(() => {
    // 初始化 Modal (只在掛載時執行一次)
    if (!deleteTradeModalRef.current) {
      deleteTradeModalRef.current = new bootstrap.Modal('#deleteTradeModal', {
        keyboard: false,
      });
    }

    fetchTradeList();
  }, []);

  return (
    <>
      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>家具收購申請清單</h2>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th
                  className="d-none d-lg-table-cell"
                  style={{ width: '120px' }}
                >
                  照片
                </th>
                <th>姓名 </th>
                <th>聯絡電話</th>
                <th className="d-none d-lg-table-cell">類別 </th>
                <th>狀況 </th>
                <th className="d-none d-lg-table-cell">尺寸 (寬x深x高)</th>
                <th className="d-none d-lg-table-cell">取件地址</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">資料讀取中...</p>
                  </td>
                </tr>
              ) : Array.isArray(tradeList) && tradeList.length > 0 ? (
                tradeList.map((item) => (
                  <tr key={item.id}>
                    {/* 照片: 對應 image */}
                    <td className="d-none d-lg-table-cell">
                      <img
                        src={item.image || 'https://via.placeholder.com/100'}
                        alt="家具照片"
                        className="img-thumbnail  object-fit-cover tradelist-img"
                      />
                    </td>
                    {/* 姓名: 對應 name */}
                    <td>
                      <div className="fw-bold">{item.name}</div>
                    </td>
                    {/* 電話: 對應 phone */}
                    <td>
                      <div className="fw-bold">{item.phone}</div>
                    </td>
                    {/* 類別 */}
                    <td className="d-none d-lg-table-cell">
                      <span>{item.category || '未分類'}</span>
                    </td>
                    {/* 狀況 */}
                    <td>
                      <span>{item.condition || '未知狀況'}</span>
                    </td>
                    {/* 尺寸 (寬x深x高): 寬->tag[2]; 深->tag[3]; 高->tag[4] */}
                    <td className="d-none d-lg-table-cell">
                      <span className="text-primary-70">
                        {item.width
                          ? `${item.width} x ${item.depth} x ${item.height} cm`
                          : '未提供尺寸'}
                      </span>
                    </td>
                    {/* 取件地址: 地址->description */}
                    <td className="d-none d-lg-table-cell">{item.address}</td>
                    <td>
                      <div className="btn-group btn-group-sm d-none d-lg-table-cell">
                        <button
                          className="btn btn-outline-danger"
                          type="button"
                          onClick={() => openDeleteModal(item)}
                        >
                          刪除
                        </button>
                      </div>
                      <button
                        className="btn d-lg-none"
                        onClick={() => setViewTrade(item)}
                      >
                        <i className="bi bi-box-arrow-up-right"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    目前沒有申請資料
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* 查看單一商品元件 */}
        <AdminSingleTrade tempTrade={viewTrade} setTempTrade={setViewTrade} />
        {/* 放置 Modal 元件 */}
        <TradeModal
          templateData={tempTrade}
          closeModal={closeDeleteModal}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default AdminTradeList;
