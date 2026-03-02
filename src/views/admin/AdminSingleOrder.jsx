function AdminSingleOrder({ tempOrder, setTempOrder }) {
  // 如果沒有資料，就不渲染任何內容，避免報錯
  if (!tempOrder) return null;

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={() => setTempOrder(null)}
      ></div>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title">訂單詳情 (ID: {tempOrder.id})</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setTempOrder(null)}
              />
            </div>
            <div className="modal-body p-4">
              <div className="row g-4">
                {/* 左邊：訂購人與訂單摘要 */}
                <div className="col-lg-5 mb-4">
                  <h6 className="fw-bold font-noto mb-3 border-bottom pb-2">
                    客戶資訊
                  </h6>
                  <ul className="list-unstyled lh-lg">
                    <li className="mb-3">
                      <span>姓名：</span> {tempOrder.user?.name}
                    </li>
                    <li className="mb-3">
                      <span>電話：</span> {tempOrder.user?.tel}
                    </li>
                    <li className="mb-3">
                      <span>信箱：</span> {tempOrder.user?.email}
                    </li>
                    <li>
                      <span>地址：</span> {tempOrder.user?.address}
                    </li>
                  </ul>

                  <h6 className="fw-bold font-noto mt-8 mb-3 border-bottom pb-2">
                    訂單狀態
                  </h6>
                  <div className="mb-4">
                    <span>下單日期：</span>
                    {/* 時間換算：秒 * 1000 */}
                    {new Date(tempOrder.create_at * 1000).toLocaleString(
                      'zh-TW',
                    )}
                  </div>
                  <div className="mb-4">
                    <span>付款狀態：</span>
                    {tempOrder.is_paid ? (
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
                  </div>
                  <div>
                    <span>訂單留言：</span>
                    <p
                      className="text-muted small mt-1" // 1. 移除 text-truncate
                      title={tempOrder.message}
                      style={{
                        maxWidth: '100%',
                        cursor: 'help',
                        wordBreak: 'break-word', // 2. 確保長英文或數字也能強制換行
                        whiteSpace: 'pre-wrap', // 3. 保留使用者輸入的原始換行
                      }}
                    >
                      {/* 4. 使用 trim() 確保純空格字串也會顯示「無留言」 */}
                      {tempOrder.message?.trim() ? tempOrder.message : '無留言'}
                    </p>
                  </div>
                </div>

                {/* 右邊：商品清單表格 */}
                <div
                  className="col-lg-7 d-flex flex-column"
                  style={{ height: '500px' }}
                >
                  {/* 1. 標題部分 (固定在最上方) */}
                  <h6 className="fw-bold font-noto mb-3 border-bottom pb-2 flex-shrink-0">
                    訂購商品
                  </h6>

                  {/* 2. 內文部分 (自動撐開並支援滾動) */}
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
                            className="font-noto text-end"
                            style={{ width: '80px' }}
                          >
                            數量
                          </th>
                          <th
                            className="font-noto text-end"
                            style={{ width: '100px' }}
                          >
                            小計
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tempOrder.products &&
                          Object.values(tempOrder.products).map((item) => (
                            <tr key={item.id}>
                              <td>
                                <div className="fw-bold font-noto">
                                  {item.product?.title}
                                </div>
                                <div className="text-muted small">
                                  單價: {item.product?.price?.toLocaleString()}
                                </div>
                              </td>
                              <td className="text-end">
                                {item.qty} {item.product?.unit}
                              </td>
                              <td className="text-end text-primary fw-bold">
                                ${item.final_total?.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {/* 3. 總計部分 (固定在最下方) */}
                  <div className="mt-auto border-top pt-3 flex-shrink-0">
                    <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded">
                      <span className="fw-bold font-noto text-black">
                        總計金額
                      </span>
                      <span className="text-danger fw-bold fs-4">
                        ${tempOrder.total?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer bg-light">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => setTempOrder(null)}
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminSingleOrder;
