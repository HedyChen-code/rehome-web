function AdminSingleTrade({ tempTrade, setTempTrade }) {
  // 如果沒有資料，就不渲染任何內容，避免報錯
  if (!tempTrade) return null;

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={() => setTempTrade(null)}
      ></div>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="p-5 text-end">
              <button
                type="button"
                className="btn-close"
                onClick={() => setTempTrade(null)}
              />
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  {/* 左邊：圖片區 */}
                  <div className="col-lg-5 mb-4">
                    {/* 照片: 對應 image */}
                    <div>
                      <img
                        src={
                          tempTrade.image || 'https://via.placeholder.com/100'
                        }
                        alt="家具照片"
                        className="img-thumbnail tradelist-img  object-fit-cover"
                      />
                    </div>
                  </div>

                  {/* 右邊：完整資料表格（你的全部欄位保留） */}
                  <div className="col-lg-7">
                    <table className="table table-bordered table-striped">
                      <tbody>
                        <tr>
                          <th style={{ width: '150px' }}>姓名</th>
                          <td>{tempTrade.name || '-'}</td>
                        </tr>
                        <tr>
                          <th style={{ width: '150px' }}>電話</th>
                          <td>{tempTrade.phone}</td>
                        </tr>

                        <tr>
                          <th>類別</th>
                          <td>{tempTrade.category || '未分類'}</td>
                        </tr>

                        <tr>
                          <th>狀況</th>
                          <td>{tempTrade.condition || '未知狀況'}</td>
                        </tr>
                        <tr>
                          <th>尺寸 (寬x深x高)</th>
                          <td>
                            {tempTrade.width
                              ? `${tempTrade.width} x ${tempTrade.depth} x ${tempTrade.height} cm`
                              : '未提供尺寸'}
                          </td>
                        </tr>

                        <tr>
                          <th>取件地址</th>
                          <td>{tempTrade.address || '-'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminSingleTrade;
