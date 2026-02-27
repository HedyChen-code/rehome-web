function AdminSingleProduct({ tempProduct, setTempProduct }) {
  // 如果沒有資料，就不渲染任何內容，避免報錯
  if (!tempProduct) return null;

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={() => setTempProduct(null)}
      ></div>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="p-5 text-end">
              <button
                type="button"
                className="btn-close"
                onClick={() => setTempProduct(null)}
              />
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  {/* 左邊：圖片區 */}
                  <div className="col-lg-5 mb-4">
                    <img
                      src={tempProduct.imageUrl}
                      className="img-fluid rounded mb-4"
                      alt="主圖"
                    />

                    {tempProduct.imagesUrl?.length > 0 && (
                      <>
                        <h6 className="mb-3">更多圖片</h6>
                        <div className="d-flex flex-wrap gap-3">
                          {tempProduct.imagesUrl.map((url, index) => (
                            <img
                              key={index}
                              src={url}
                              className="img-fluid rounded border"
                              style={{
                                width: '120px',
                                height: '120px',
                                objectFit: 'cover',
                              }}
                              alt={`副圖 ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* 右邊：完整資料表格（你的全部欄位保留） */}
                  <div className="col-lg-7">
                    <table className="table table-bordered table-striped">
                      <tbody>
                        <tr>
                          <th style={{ width: '150px' }}>商品名稱</th>
                          <td>{tempProduct.title || '-'}</td>
                        </tr>
                        <tr>
                          <th style={{ width: '150px' }}>商品分類</th>
                          <td>{tempProduct.category}</td>
                        </tr>

                        <tr>
                          <th>商品風格</th>
                          <td>{tempProduct.style || '-'}</td>
                        </tr>

                        <tr>
                          <th>中古程度</th>
                          <td>{tempProduct.condition_level}</td>
                        </tr>
                        <tr>
                          <th>材料</th>
                          <td>
                            {tempProduct.material?.length
                              ? tempProduct.material.join('、')
                              : '-'}
                          </td>
                        </tr>

                        <tr>
                          <th>顏色</th>
                          <td>{tempProduct.color || '-'}</td>
                        </tr>

                        <tr>
                          <th>尺寸</th>
                          <td>
                            {tempProduct.size?.w ?? '-'}
                            {tempProduct.size?.unit ?? ''}（寬） ×{' '}
                            {tempProduct.size?.d ?? '-'}
                            {tempProduct.size?.unit ?? ''}（深） ×{' '}
                            {tempProduct.size?.h ?? '-'}
                            {tempProduct.size?.unit ?? ''}（高）
                          </td>
                        </tr>

                        <tr>
                          <th>產品描述</th>
                          <td>{tempProduct.description || '-'}</td>
                        </tr>

                        <tr>
                          <th>商品程度</th>
                          <td>{tempProduct.condition_level || '-'}</td>
                        </tr>

                        <tr>
                          <th>商品故事-標題</th>
                          <td>{tempProduct.content?.story_title || '-'}</td>
                        </tr>
                        <tr>
                          <th>商品故事-內容</th>
                          <td>{tempProduct.content?.story_content || '-'}</td>
                        </tr>

                        <tr>
                          <th>上架狀態</th>
                          <td>
                            {tempProduct.is_enabled ? (
                              <span className="badge bg-success text-gray-70 rounded-pill fs-8">
                                <i className="bi bi-check-circle-fill"></i>
                                <span className="ms-2">上架中</span>
                              </span>
                            ) : (
                              <span className="badge bg-danger text-gray-70 rounded-pill fs-8">
                                <i className="bi bi-x-circle-fill"></i>
                                <span className="ms-2">未上架</span>
                              </span>
                            )}
                          </td>
                        </tr>

                        <tr>
                          <th>新品狀態</th>
                          <td>
                            {tempProduct.is_new ? (
                              <span className="badge text-success rounded-pill fs-5">
                                <i className="bi bi-check-circle-fill"></i>
                              </span>
                            ) : (
                              <span className="badge text-danger rounded-pill fs-5">
                                <i className="bi bi-x-circle-fill"></i>
                              </span>
                            )}
                          </td>
                        </tr>

                        <tr>
                          <th>推薦狀態</th>
                          <td>
                            {tempProduct.is_is_recommend ? (
                              <span className="badge text-success rounded-pill fs-5">
                                <i className="bi bi-check-circle-fill"></i>
                              </span>
                            ) : (
                              <span className="badge text-danger rounded-pill fs-5">
                                <i className="bi bi-x-circle-fill"></i>
                              </span>
                            )}
                          </td>
                        </tr>

                        <tr>
                          <th>原價</th>
                          <td>{tempProduct.origin_price} 元</td>
                        </tr>

                        <tr>
                          <th>售價</th>
                          <td>{tempProduct.price} 元</td>
                        </tr>

                        <tr>
                          <th>數量</th>
                          <td>
                            {tempProduct.qty} {tempProduct.unit}
                          </td>
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
export default AdminSingleProduct;
