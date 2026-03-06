import { useEffect, useState } from 'react';
import { tradeApi } from '../../api/tradeApi';
import useMessage from '../../hooks/useMessage';
import AdminSingleTrade from './AdminSingleTrade';

function AdminTradeList() {
  const [tradeList, setTradeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showError, showSuccess } = useMessage();
  const [tempTrade, setTempTrade] = useState(null);

  // 1. 取得資料
  const fetchTradeList = async () => {
    try {
      setIsLoading(true);
      const result = await tradeApi.getTrades(); // 這裡拿到的是 GAS 回傳的完整物件

      console.log('原始回傳資料：', result);

      // 💡 關鍵修改：檢查結構並存入 data 陣列
      if (result && result.status === 'success' && Array.isArray(result.data)) {
        setTradeList(result.data);
        showSuccess('資料讀取成功');
      } else {
        // 處理後端回傳 status 為 error 的情況
        setTradeList([]);
        showError(result.message || '資料格式錯誤');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      showError('資料讀取失敗，請檢查網路或 CORS 設定');
    } finally {
      setIsLoading(false);
    }
  };

  // 新增刪除功能
  const handleDelete = async (e, id) => {
    // 阻止原生 HTML 行為，防止它變成「新增」
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!window.confirm('確定要刪除嗎？')) return;

    try {
      const result = await tradeApi.deleteTrade(id);
      console.log('刪除回傳：', result);
      // 重新取得列表
      fetchTradeList();
    } catch (error) {
      // 即使報 CORS 錯誤，其實通常已經刪除成功了
      console.error('雖然報 CORS，但請檢查試算表是否已刪除');
      fetchTradeList();
    }
  };
  useEffect(() => {
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
                          onClick={(e) => handleDelete(e, item.id)}
                        >
                          刪除
                        </button>
                      </div>
                      <button
                        className="btn d-lg-none"
                        onClick={() => setTempTrade(item)}
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
        <AdminSingleTrade tempTrade={tempTrade} setTempTrade={setTempTrade} />
      </div>
    </>
  );
}

export default AdminTradeList;
