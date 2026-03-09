import { useEffect, useState } from 'react';

function TradeModal({ templateData, closeModal, handleDelete }) {
  const [tempData, setTempData] = useState(templateData);
  // 新增：處理中狀態
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setTempData(templateData);
    // 當傳入資料改變時（通常是打開新的一筆），重置讀取狀態
    setIsDeleting(false);
  }, [templateData]);

  // 包裝原本的 handleDelete
  const onConfirm = async (id) => {
    setIsDeleting(true); // 開始轉圈
    try {
      await handleDelete(id); // 呼叫父元件傳進來的非同步刪除函式
    } catch (error) {
      console.error('刪除失敗', error);
    } finally {
      setIsDeleting(false); // 結束轉圈
    }
  };

  return (
    <div className="modal fade" id="deleteTradeModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content border-0">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">刪除收購申請</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
              disabled={isDeleting} // 處理中禁用關閉
            ></button>
          </div>
          <div className="modal-body">
            <p className="fs-5">
              確定要刪除
              <span className="text-danger fw-bold"> {tempData?.name} </span>
              的申請嗎？
            </p>
            <p className="text-muted small">※ 刪除後資料將無法還原。</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={closeModal}
              disabled={isDeleting} // 處理中禁用取消
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-danger"
              disabled={isDeleting} // 處理中禁用按鈕，防止重複點擊
              onClick={() => onConfirm(tempData.id)} // 改呼叫內部的 onConfirm
            >
              {isDeleting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  刪除中...
                </>
              ) : (
                '確認刪除'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradeModal;
