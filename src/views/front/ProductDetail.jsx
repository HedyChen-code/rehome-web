import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink, useParams } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ScrollToTop from '../../components/ScrollToTop';

// Swiper 樣式
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { RotatingLines } from 'react-loader-spinner';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  // state 儲存目前顯示的主圖
  const [mainImage, setMainImage] = useState('');
  // 儲存推薦商品的 state
  const [recommendProducts, setRecommendProducts] = useState([]);

  useEffect(() => {
    const handleView = async (id) => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/${API_PATH}/product/${id}`,
        );
        setProduct(res.data.product);
        setMainImage(res.data.product.imageUrl);
      } catch (error) {
        toast.error(
          `取得商品資料失敗: ${error.response?.data?.message}，請洽工作人員`,
        );
      }
    };
    // 取得所有產品並篩選推薦商品
    const getRecommendProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`);
        const allProducts = res.data.products;
        // 篩選 is_recommend === 1 且排除掉目前正在看的這件商品
        const filtered = allProducts.filter(
          (item) => item.is_recommend === 1 && item.id !== id,
        );
        setRecommendProducts(filtered);
      } catch (error) {
        console.error('取得推薦商品失敗', error);
      }
    };
    handleView(id);
    getRecommendProducts();
  }, [id]);

  const addCart = async (id, qty = 1) => {
    try {
      const data = {
        product_id: id,
        qty,
      };
      const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data,
      });
      toast.success(`${res.data.message}`);
    } catch (error) {
      toast.error(
        `加入購物車失敗: ${error.response?.data?.message}，請洽工作人員`,
      );
    }
  };
  return (
    <>
      <ScrollToTop />
      {!product ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // 滿螢幕高度
          }}
        >
          <RotatingLines
            strokeColor="#8183D3"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className="container" style={{ marginTop: '144px' }}>
            <Toaster position="top-right" reverseOrder={false} />
            {/* 麵包屑 */}
            <nav aria-label="breadcrumb" className="mb-8 mb-lg-9 mt-12">
              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <NavLink to="/" className={'font-noto text-gray-50'}>
                    首頁
                  </NavLink>
                </li>
                <li className="breadcrumb-item ps-lg-8">
                  <NavLink to="/products" className={'font-noto text-gray-50'}>
                    所有商品
                  </NavLink>
                </li>
                <li
                  className="breadcrumb-item font-noto ps-lg-8 text-primary-70"
                  aria-current="page"
                >
                  {product.title}
                </li>
              </ol>
            </nav>

            <div className="row">
              {/* 產品圖片 */}
              <div className="col-lg-6 px-lg-0">
                <section className="mb-9">
                  {/* 大圖 */}
                  <div className="mb-4">
                    <img
                      src={mainImage}
                      className="img-fluid rounded object-fit-cover"
                      alt="主圖"
                    />
                  </div>
                  {/* 小圖 */}
                  {product.imagesUrl?.length > 0 && (
                    <Swiper
                      modules={[]}
                      spaceBetween={8}
                      slidesPerView={2.5} // 一次顯示 4 張
                      breakpoints={{
                        768: { slidesPerView: 4 }, // 平板顯示 3 張
                        992: { slidesPerView: 4, spaceBetween: 12 },
                      }}
                    >
                      {[product.imageUrl, ...product.imagesUrl].map(
                        (url, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={url}
                              className="img-fluid rounded object-fit-cover"
                              style={{
                                width: '150px',
                                height: '100px',
                                cursor: 'pointer',
                                border:
                                  mainImage === url
                                    ? '2px solid #000'
                                    : '1px solid #ccc',
                              }}
                              alt={`副圖 ${index}`}
                              onClick={() => setMainImage(url)}
                            />
                          </SwiperSlide>
                        ),
                      )}
                    </Swiper>
                  )}
                </section>
              </div>
              {/* 產品大綱 */}
              <div className="col-lg-6 ps-lg-14 pe-lg-0">
                {/* 商品基本介紹 */}
                <section className="mb-9 mt-lg-8" key={product.id}>
                  {/* 標籤 */}
                  <div className="mb-4">
                    <p className="font-noto d-inline rounded-pill fs-9 fs-lg-8 bg-secondary-10 text-gray-70 py-2 px-4 me-5">
                      {product.category}
                    </p>
                    <p className="font-noto d-inline rounded-pill fs-9 fs-lg-8 bg-secondary-10 text-gray-70 py-2 px-4">
                      {product.condition_level}
                    </p>
                  </div>
                  {/* 商品名稱+金額 */}
                  <h3 className="fs-lg-2 text-gray-95 fw-medium mb-5 mb-lg-9">
                    {product.title}
                  </h3>
                  <h4 className="fs-lg-3 text-gray-95 fw-medium mb-5 mb-lg-9">
                    <span className="fs-6 fs-lg-5 align-text-top fw-normal">
                      NT${' '}
                    </span>
                    {product.price.toLocaleString()}
                  </h4>
                  {/* 產品故事 */}
                  <h6 className="text-gray-50 fw-medium mb-4">it’s story...</h6>
                  <div className="py-5 px-4 p-lg-8 mb-5 mb-lg-9 bg-light-gray rounded-24">
                    <h6 className="fs-lg-4 text-gray-95 fw-medium mb-4">
                      {product.content.story_title}
                    </h6>
                    <p className="font-noto text-primary-70 fs-8 fs-lg-7">
                      {product.content.story_content}
                    </p>
                  </div>
                  {/* 按鈕 */}
                  <div className="pb-9 pb-lg-10 border-bottom border-gray-30 d-lg-flex mb-lg-10">
                    <button
                      className="w-100 btn btn-outline-primary-90 rounded-pill p-0 mb-5 mb-lg-0 me-lg-8"
                      onClick={() => addCart(product.id)}
                    >
                      <h5 className="fw-medium my-5">加入購物車</h5>
                    </button>
                    <button className="w-100 btn btn-primary-90 rounded-pill p-0">
                      <h5 className="fw-medium my-5">立即購買</h5>
                    </button>
                  </div>
                </section>

                {/* 產品詳細資料 */}
                <section className="mb-9 mb-lg-10">
                  <h4 className="product-title fw-medium text-gray-95 py-2 mb-8">
                    產品詳細資料
                  </h4>
                  <ul>
                    {/* 類別 */}
                    <li className="mb-5 d-lg-flex align-items-start">
                      <p
                        className="font-noto text-gray-50 flex-shrink-0 mb-lg-0"
                        style={{ width: '200px' }}
                      >
                        類別
                      </p>
                      <p className="font-noto text-gray-95">
                        {product.category}
                      </p>
                    </li>
                    {/* 風格 */}
                    <li className="mb-5 d-lg-flex align-items-start">
                      <p
                        className="font-noto text-gray-50 flex-shrink-0 mb-lg-0"
                        style={{ width: '200px' }}
                      >
                        風格
                      </p>
                      <p className="font-noto text-gray-95">{product.style}</p>
                    </li>
                    {/* 材質 */}
                    <li className="mb-5 d-lg-flex align-items-start">
                      <p
                        className="font-noto text-gray-50 flex-shrink-0 mb-lg-0"
                        style={{ width: '200px' }}
                      >
                        材質
                      </p>
                      <p className="font-noto text-gray-95">
                        {product.description}
                      </p>
                    </li>
                    {/* 顏色 */}
                    <li className="mb-5 d-lg-flex align-items-start">
                      <p
                        className="font-noto text-gray-50 flex-shrink-0 mb-lg-0"
                        style={{ width: '200px' }}
                      >
                        顏色
                      </p>
                      <p className="font-noto text-gray-95">{product.color}</p>
                    </li>
                    {/* 尺寸（mm） */}
                    <li className="mb-5 d-lg-flex align-items-start">
                      <p
                        className="font-noto text-gray-50 flex-shrink-0 mb-lg-0"
                        style={{ width: '200px' }}
                      >
                        尺寸（{product.size.unit}）
                      </p>
                      <p className="font-noto text-gray-95">
                        {product.size.w}（寬）× {product.size.d}（深）×{' '}
                        {product.size.h}
                        （高）
                      </p>
                    </li>
                    {/* 中古程度 */}
                    <li className="mb-5 d-lg-flex align-items-start">
                      <p
                        className="font-noto text-gray-50 flex-shrink-0 mb-lg-0"
                        style={{ width: '200px' }}
                      >
                        中古程度
                      </p>
                      <p className="font-noto text-gray-95">
                        {product.condition_level}
                      </p>
                    </li>
                  </ul>
                </section>

                {/* 購買前注意事項 */}
                <section className="mb-4 mb-lg-0">
                  <h4 className="product-title fw-medium text-gray-95 py-2 mb-8">
                    購買前注意事項
                  </h4>
                  <div className="accordion mb-lg-12" id="accordionExample">
                    <div className="accordion-item mb-8">
                      <h6
                        className="accordion-header fw-medium"
                        id="headingOne"
                      >
                        <button
                          className="accordion-button py-lg-4 px-lg-8 fs-lg-6"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          關於商品狀況與品質
                        </button>
                      </h6>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show bg-primary-10 rounded-24 "
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body p-8">
                          <ul>
                            <li className="mb-8">
                              <p className="font-noto fw-bold">
                                中古商品定義：
                              </p>
                              <p className="font-noto">
                                本站所有商品均為二手良品，非全新狀態。商品狀況已透過中古程度分級（A、B、C、D）和實拍圖片詳盡揭示。
                              </p>
                            </li>
                            <li className="mb-8">
                              <p className="fw-bold font-noto">色差與測量：</p>
                              <p className="font-noto">
                                由於拍攝光線、螢幕設定差異及人工測量，商品可能存在微小色差或尺寸誤差，請以實物為準。
                              </p>
                            </li>
                            <li>
                              <p className="fw-bold font-noto">不完美聲明：</p>
                              <p className="font-noto">
                                物拾 Re: home
                                致力於清潔與整新，但二手傢俱難免帶有歲月痕跡（如細微刮痕、自然色差、輕微使用感），此為其獨特魅力，非屬瑕疵範圍。
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item mb-8">
                      <h6
                        className="accordion-header fw-medium"
                        id="headingTwo"
                      >
                        <button
                          className="accordion-button collapsed py-lg-4 px-lg-8 fs-lg-6"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          關於物流與運送限制
                        </button>
                      </h6>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse bg-primary-10 rounded-24 "
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body p-8">
                          <ul>
                            <li className="mb-8">
                              <p className="fw-bold font-noto">大件運送：</p>
                              <p className="font-noto">
                                大型傢俱（沙發、床架、櫃體等）不適用一般宅配服務，請選擇【送貨到家】專屬物流，並在結帳時確認是否有樓層費產生。
                              </p>
                            </li>
                            <li className="mb-8">
                              <p className="fw-bold font-noto">自取條件：</p>
                              <p className="font-noto">
                                選擇【門市自取】前，請務必確認您的車輛是否能容納商品尺寸，並自行準備打包和搬運工具。
                              </p>
                            </li>
                            <li>
                              <p className="fw-bold font-noto">運送風險：</p>
                              <p className="font-noto">
                                物流配送時可能發生不可預期之狀況。建議收件時務必當場驗收，若發現嚴重破損，請立即拍照存證並拒收。
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item mb-4 mb-lg-0">
                      <h6
                        className="accordion-header fw-medium"
                        id="headingThree"
                      >
                        <button
                          className="accordion-button collapsed py-lg-4 px-lg-8 fs-lg-6"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          關於退換貨政策
                        </button>
                      </h6>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse bg-primary-10 rounded-24 overflow-hidden"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body p-8">
                          <ul>
                            <li className="mb-8">
                              <p className="fw-bold font-noto">鑑賞期：</p>
                              <p className="font-noto">
                                依據本站退換貨政策，請在收到商品後確認商品狀況。如需退換，請於指定期限內聯繫客服。
                              </p>
                            </li>
                            <li>
                              <p className="fw-bold font-noto">排除範圍：</p>
                              <p className="font-noto">
                                因個人因素（如尺寸不合、顏色不喜歡、與想像不符）要求退換，買家需自行負擔退貨運費及相關處理費用。中古等級
                                C、D
                                級商品可能依合約排除退換貨服務，請詳閱商品描述。
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* 你可能會喜歡 */}
              <section className="my-12">
                <h6 className="text-gray-90 mb-8 text-lg-center">
                  你可能也會喜歡⋯⋯
                </h6>
                <div className="position-relative">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={24}
                    slidesPerView={1.4}
                    navigation={{
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    }}
                    pagination={{
                      enabled: false,
                      type: 'progressbar',
                    }}
                    breakpoints={{
                      576: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 2.5,
                      },
                      992: {
                        slidesPerView: 3,
                      },
                      1200: {
                        slidesPerView: 5,
                        navigation: {
                          enabled: true,
                        },
                        pagination: {
                          enabled: true,
                        },
                      },
                    }}
                  >
                    {recommendProducts.map((item) => (
                      <SwiperSlide key={item.id}>
                        <NavLink
                          to={`/product/${item.id}`}
                          className="text-decoration-none"
                        >
                          <div className="mb-4">
                            <img
                              src={item.imageUrl}
                              className="img-fluid rounded"
                              alt={item.title}
                              style={{
                                width: '100%',
                                height: 160,
                                cursor: 'pointer',
                                objectFit: 'cover',
                              }}
                            />
                          </div>
                          <div className="px-3 py-0">
                            <span className="font-noto rounded-pill fs-9 fs-lg-8 bg-secondary-10 text-gray-70 py-2 px-4 me-5">
                              {item.condition_level}
                            </span>
                            <p className="fs-lg-6 d-block fw-medium lh-sm text-gray-95 mt-3 mb-4">
                              {item.title}
                            </p>
                            <p className="font-noto fs-lg-7 text-gray-95 fs-8">
                              NT$ {item.price?.toLocaleString()}
                            </p>
                          </div>
                        </NavLink>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <div className="custom-prev swiper-button-prev d-none d-xl-flex rounded-circle"></div>
                  <div className="custom-next swiper-button-next d-none d-xl-flex rounded-circle"></div>
                </div>
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default ProductDetail;
