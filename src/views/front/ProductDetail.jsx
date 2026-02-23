import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useParams } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Swiper 樣式
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  // state 儲存目前顯示的主圖
  const [mainImage, setMainImage] = useState('');

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
    handleView(id);
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
      {!product ? (
        <div className="text-center mt-5">載入中...</div>
      ) : (
        <>
          <div className="container" style={{ marginTop: '144px' }}>
            <Toaster position="top-right" reverseOrder={false} />
            {/* 麵包屑 */}
            <nav
              style={{ '--bs-breadcrumb-divider': "'>'" }}
              aria-label="breadcrumb"
              className="mb-8"
            >
              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <Link to="/">首頁</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to="/product">所有商品</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {product.title}
                </li>
              </ol>
            </nav>

            <div className="row">
              <div className="col-lg-6">
                {/* 產品圖片 */}
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
                      spaceBetween={12}
                      slidesPerView={2.5} // 一次顯示 4 張
                      breakpoints={{
                        768: { slidesPerView: 4 }, // 平板顯示 3 張
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
              <div className="col-lg-6">
                {/* 產品大綱 */}
                <section className="mb-9" key={product.id}>
                  {/* 標籤 */}
                  <div className="mb-4">
                    <p className="d-inline rounded bg-secondary-10 text-gray-70 py-2 px-4 me-5">
                      {product.category}
                    </p>
                    <p className="d-inline rounded bg-secondary-10 text-gray-70 py-2 px-4">
                      {product.condition_level}
                    </p>
                  </div>
                  <h3 className="text-gray-90 mb-5">{product.title}</h3>
                  <p className="fs-4 text-gray-90 mb-5">NT${product.price}</p>
                  {/* 產品故事 */}
                  <p className="text-gray fs-6 mb-4">it’s story...</p>
                  <div className="py-5 px-4 mb-5 bg-light-grey">
                    <p className="fs-6 mb-4">{product.content.story_title}</p>
                    <p className="text-primary-70 fs-8">
                      {product.content.story_content}
                    </p>
                  </div>
                  {/* 按鈕 */}
                  <div className="pb-9 border-bottom border-gray-30 d-lg-flex mb-lg-10">
                    <button
                      className="w-100 btn btn-outline-primary-90 mb-5 mb-lg-0 me-lg-8"
                      onClick={() => addCart(product.id)}
                    >
                      加入購物車
                    </button>
                    <button className="w-100 btn btn-primary-90">
                      立即購買
                    </button>
                  </div>
                </section>

                {/* 產品詳細資料 */}
                <section className="mb-9">
                  <h4 className="py-2 mb-8">產品詳細資料</h4>
                  <ul>
                    {/* 類別 */}
                    <li className="mb-5">
                      <p className="text-gray">類別</p>
                      <p>{product.category}</p>
                    </li>
                    {/* 風格 */}
                    <li className="mb-5">
                      <p className="text-gray">風格</p>
                      <p>{product.style}</p>
                    </li>
                    {/* 材質 */}
                    <li className="mb-5">
                      <p className="text-gray">材質</p>
                      <p>{product.description}</p>
                    </li>
                    {/* 顏色 */}
                    <li className="mb-5">
                      <p className="text-gray">顏色</p>
                      <p>{product.color}</p>
                    </li>
                    {/* 尺寸（mm） */}
                    <li className="mb-5">
                      <p className="text-gray">尺寸（{product.size.unit}）</p>
                      <p>
                        {product.size.w}（寬）× {product.size.d}（深）×{' '}
                        {product.size.h}
                        （高）
                      </p>
                    </li>
                    {/* 中古程度 */}
                    <li className="mb-5">
                      <p className="text-gray">中古程度</p>
                      <p>{product.condition_level}</p>
                    </li>

                    {/* 物齡 */}
                    {/* <li className="mb-5">
                  <p className="text-gray">物齡</p>
                  <p>1 年</p>
                </li> */}
                    {/* 層板數量 */}
                    {/* <li className="mb-5">
                  <p className="text-gray">層板數量</p>
                  <p>5 層</p>
                </li> */}
                    {/* 承重限制 */}
                    {/* <li className="mb-5">
                  <p className="text-gray">承重限制</p>
                  <p>單層 15 kg</p>
                </li> */}
                    {/* 組裝要求 */}
                    {/* <li className="">
                  <p className="text-gray">組裝要求</p>
                  <p>已完成組裝</p>
                </li> */}
                  </ul>
                </section>

                {/* 購買前注意事項 */}
                <section className="mb-4">
                  <h4 className="py-2 mb-8">購買前注意事項</h4>
                  <div className="accordion">
                    <div className="accordion-item mb-3">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          關於商品狀況與品質
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">Content for item 1</div>
                      </div>
                    </div>

                    <div className="accordion-item mb-3">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          關於物流與運送限制
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">Content for item 2</div>
                      </div>
                    </div>
                    <div className="accordion-item mb-3">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          關於退換貨政策
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">Content for item 3</div>
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
                    slidesPerView={1.2}
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
                    <SwiperSlide>
                      <div className="mb-4">
                        <img
                          src="images/product/product02.jpg"
                          className="img-fluid rounded"
                          alt=""
                        />
                      </div>
                      <div className="px-3 py-0">
                        <span className="rounded bg-secondary-10 text-gray-70 py-2 px-4">
                          中古程度B
                        </span>
                        <p className="d-block mt-3 mb-4">北歐實木三人座沙發</p>
                        <p className="">$18,500</p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="mb-4">
                        <img
                          src="images/product/product02.jpg"
                          className="img-fluid rounded"
                          alt=""
                        />
                      </div>
                      <div className="px-3 py-0">
                        <span className="rounded bg-secondary-10 text-gray-70 py-2 px-4">
                          中古程度B
                        </span>
                        <p className="d-block mt-3 mb-4">北歐實木三人座沙發</p>
                        <p className="">$18,500</p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="mb-4">
                        <img
                          src="images/product/product02.jpg"
                          className="img-fluid rounded"
                          alt=""
                        />
                      </div>
                      <div className="px-3 py-0">
                        <span className="rounded bg-secondary-10 text-gray-70 py-2 px-4">
                          中古程度B
                        </span>
                        <p className="d-block mt-3 mb-4">北歐實木三人座沙發</p>
                        <p className="">$18,500</p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="mb-4">
                        <img
                          src="images/product/product02.jpg"
                          className="img-fluid rounded"
                          alt=""
                        />
                      </div>
                      <div className="px-3 py-0">
                        <span className="rounded bg-secondary-10 text-gray-70 py-2 px-4">
                          中古程度B
                        </span>
                        <p className="d-block mt-3 mb-4">北歐實木三人座沙發</p>
                        <p className="">$18,500</p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="mb-4">
                        <img
                          src="images/product/product02.jpg"
                          className="img-fluid rounded"
                          alt=""
                        />
                      </div>
                      <div className="px-3 py-0">
                        <span className="rounded bg-secondary-10 text-gray-70 py-2 px-4">
                          中古程度B
                        </span>
                        <p className="d-block mt-3 mb-4">北歐實木三人座沙發</p>
                        <p className="">$18,500</p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="mb-4">
                        <img
                          src="images/product/product02.jpg"
                          className="img-fluid rounded"
                          alt=""
                        />
                      </div>
                      <div className="px-3 py-0">
                        <span className="rounded bg-secondary-10 text-gray-70 py-2 px-4">
                          中古程度B
                        </span>
                        <p className="d-block mt-3 mb-4">北歐實木三人座沙發</p>
                        <p className="">$18,500</p>
                      </div>
                    </SwiperSlide>
                  </Swiper>

                  <div className="custom-prev swiper-button-prev d-none d-lg-flex rounded-circle"></div>
                  <div className="custom-next swiper-button-next d-none d-lg-flex rounded-circle"></div>
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
