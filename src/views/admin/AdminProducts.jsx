import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as bootstrap from 'bootstrap';
import ProductModal from '../../components/ProductModal';
import Pagination from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';
import AdminSingleProduct from './AdminSingleProduct';
import useMessage from '../../hooks/useMessage';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;
const INITIAL_TEMPLATE_DATA = {
  id: '', // 產品 ID
  title: '', // 產品名稱
  category: '', // 類別
  style: '', // 風格
  condition_level: '', // 商品程度
  description: '', // 產品描述
  color: '', // 顏色
  size: { d: 0, h: 0, w: 0, unit: 'mm' }, // 尺寸，物件
  content: { story_title: '', story_content: '' }, // 商品故事 (content)
  origin_price: 0, // 原始價格
  price: 0, // 售價
  qty: 1, // 數量，保留預設 1
  num: 1,
  unit: '', // 單位
  is_enabled: 1, // 是否啟用，保留預設 1
  is_new: 1,
  is_is_recommend: 1,
  material: [],
  imageUrl: '', // 主照片網址
  imagesUrl: [], // 更多照片網址
};

function AdminProducts() {
  const navigate = useNavigate();
  // 所有產品資料
  const [products, setProducts] = useState([]);
  // 可以查看的單一產品
  const [tempProduct, setTempProduct] = useState(null);
  // useRef 建立對 DOM 元素的參照
  const productModalRef = useRef(null);
  const [modalType, setModalType] = useState(''); // "create", "edit", "delete"
  // 產品表單資料模板
  const [templateData, setTemplateData] = useState(INITIAL_TEMPLATE_DATA);
  //分頁
  const [pagination, setPagination] = useState({});

  const { showError } = useMessage();
  const [isLoading, setIsLoading] = useState(true);

  // 取得所有商品資料.
  const getData = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/products?page=${page}`,
      );
      setProducts(res.data.products);
      setPagination(res.data.pagination);
      console.log(res.data.products);
    } catch (error) {
      showError(error.response?.data?.message || '取得資料失敗');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 使用 ref 控制 Modal
  const openModal = (product, type) => {
    setModalType(type);

    setTemplateData({
      ...INITIAL_TEMPLATE_DATA,
      ...product,
    });

    productModalRef.current.show();
  };
  const closeModal = () => {
    productModalRef.current.hide();
    setTemplateData(INITIAL_TEMPLATE_DATA);
  };

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
    if (!productModalRef.current) {
      productModalRef.current = new bootstrap.Modal('#productModal', {
        keyboard: false,
      });
    }

    const checkAdmin = async () => {
      try {
        await axios.post(`${API_BASE}/api/user/check`);
        getData(); // 驗證成功後抓資料
      } catch (err) {
        showError(err.response?.data?.message || '驗證失敗');
        navigate('/');
      }
    };

    checkAdmin();
  }, [navigate, getData]);

  return (
    <>
      <div className="mt-5">
        {/* 產品列表 */}
        <div className="mt-5">
          <div className="d-flex justify-content-between mb-3">
            <h2>產品列表</h2>
            <span>
              <button
                type="button"
                className="btn btn-secondary-40"
                onClick={() => openModal(INITIAL_TEMPLATE_DATA, 'create')}
              >
                新增商品
              </button>
            </span>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="text-center">產品資訊</th>
                <th className="text-center">原價</th>
                <th className="text-center">售價</th>
                <th className="text-center">上架狀態</th>
                <th className="text-center">推薦狀態</th>
                <th className="text-center">新品狀態</th>
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
              ) : products && products.length > 0 ? (
                // 2. 有資料的狀態
                products.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex">
                        <div style={{ width: '100px', height: '100px' }}>
                          <img
                            src={item.imageUrl}
                            className="img-fluid rounded object-fit-cover"
                            alt="主圖"
                          />
                        </div>
                        <div className="ms-3 flex-grow-1 d-flex flex-column justify-content-between">
                          {/* 上方商品名 */}
                          <p className="fs-5 mb-1">{item.title}</p>

                          {/* 下方分類 & 風格 */}
                          <div>
                            <p className="mb-0 text-warning">{item.category}</p>
                            <p className="mb-0 text-info">{item.style}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center align-middle">
                      {item.origin_price.toLocaleString()}
                    </td>
                    <td className="text-center align-middle">
                      {item.price.toLocaleString()}
                    </td>
                    <td className="text-center align-middle">
                      {item.is_enabled ? (
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
                    <td className="text-center align-middle">
                      {item.is_new ? (
                        <span className="badge text-success rounded-pill fs-5">
                          <i className="bi bi-check-circle-fill"></i>
                        </span>
                      ) : (
                        <span className="badge text-danger rounded-pill fs-5">
                          <i className="bi bi-x-circle-fill"></i>
                        </span>
                      )}
                    </td>
                    <td className="text-center align-middle">
                      {item.is_is_recommend ? (
                        <span className="badge text-success rounded-pill fs-5">
                          <i className="bi bi-check-circle-fill"></i>
                        </span>
                      ) : (
                        <span className="badge text-danger rounded-pill fs-5">
                          <i className="bi bi-x-circle-fill"></i>
                        </span>
                      )}
                    </td>
                    <td className="text-center align-middle">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setTempProduct(item)}
                      >
                        查看細節
                      </button>
                    </td>
                    <td className="text-center align-middle">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-outline-info btn-sm"
                          onClick={() => openModal(item, 'edit')}
                        >
                          編輯
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => openModal(item, 'delete')}
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                // 3. 確定沒資料的狀態
                <tr>
                  <td colSpan="8" className="text-center py-5 text-muted">
                    尚無產品資料
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 查看單一商品元件 */}
      <AdminSingleProduct
        tempProduct={tempProduct}
        setTempProduct={setTempProduct}
      />

      {/* modal元件 */}
      <ProductModal
        modalType={modalType}
        templateData={templateData}
        closeModal={closeModal}
        getData={getData}
      />
      {/* 分頁元件 */}
      <Pagination pagination={pagination} getData={getData} />
    </>
  );
}
export default AdminProducts;
