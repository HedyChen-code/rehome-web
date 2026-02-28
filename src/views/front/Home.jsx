import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// 引入 Swiper React 元件
import { Swiper, SwiperSlide } from "swiper/react";
// 引入 Swiper 樣式
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 引入需要的模組 (選用：導覽箭頭、分頁點)
import { Navigation, Pagination } from "swiper/modules";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductCategorySection() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("沙發 / 座椅類");
  const [activeTab, setActiveTab] = useState("新品");

  const getProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`);
      setProducts(res.data.products);
    } catch (error) {
      toast.error("取得資料失敗");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((item) => {
    const isCategoryMatch = item.category === activeCategory;
    let isTabMatch = false;
    if (activeTab === "新品") {
      isTabMatch = item.is_new === 1 || item.is_new === true;
    } else if (activeTab === "推薦") {
      isTabMatch = item.is_recommend === 1 || item.is_recommend === true;
    }
    return isCategoryMatch && isTabMatch;
  });

  const categoryMenu = [
    "沙發 / 座椅類",
    "儲物 / 櫃體類",
    "床具 / 寢臥類",
    "桌類 / 檯面類",
    "擺飾 / 家飾類",
  ];

  const themes = [
    {
      img: "images/theme/theme01.jpg",
      title: "工業",
      className: "corner-tl",
      alt: "theme01",
    },
    {
      img: "images/theme/theme02.jpg",
      title: "義大利現代",
      className: "",
      alt: "theme02",
    },
    {
      img: "images/theme/theme03.jpg",
      title: "現代北歐",
      className: "",
      alt: "theme03",
    },
    {
      img: "images/theme/theme04.jpg",
      title: "日式無印",
      className: "corner-tr",
      alt: "theme04",
    },
    {
      img: "images/theme/theme05.jpg",
      title: "現代簡約風",
      className: "corner-bl",
      alt: "theme05",
    },
    {
      img: "images/theme/theme06.jpg",
      title: "世紀中期",
      className: "",
      alt: "theme06",
    },
    {
      img: "images/theme/theme07.jpg",
      title: "療癒奶油",
      className: "",
      alt: "theme07",
    },
    {
      img: "images/theme/theme08.jpg",
      title: "宅寂",
      className: "corner-br",
      alt: "theme08",
    },
  ];

  const carouselData = [
    {
      image: "images/banner/banner01.png",
      alt: "banner01",
      title: "質感生活，不必高價擁有",
      text: "物拾嚴選：經專業處理與清潔，讓您放心添購優質二手設計。",
    },
    {
      image: "images/banner/banner02.png",
      alt: "banner02",
      title: "空間換新，輕鬆啟動",
      text: "專業團隊上門服務，為您閒置的優質家具高效估價與收購。",
    },
    {
      image: "images/banner/banner03.png",
      alt: "banner03",
      title: "尋找有故事的獨特設計",
      text: "曾經的使用痕跡是生活的溫度與意義，讓每次選購、都像收藏一段生活。",
    },
  ];
  return (
    <>
      <div className="hero-section">
        <section data-aos="fade-right">
          <div
            id="heroCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            {/* 指示點 */}
            <div className="carousel-indicators">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#heroCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>

            {/* 輪播內容 */}
            <div className="carousel-inner">
              {carouselData.map((item, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={item.image}
                    className="d-block w-100"
                    alt={item.alt}
                  />

                  <div className="carousel-caption hero-caption container">
                    <div className="caption-content">
                      <p className="fs-4 fs-lg-1 mb-3 bg-white text-gray-95 rounded text-start text-lg-center">
                        {item.title}
                      </p>
                      <p className="fs-9 fs-lg-6 text-white text-shadow">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* S1延續美好生活 */}
      <section className="service-section my-16">
        <div className="container position-relative">
          {/* 裝飾小圖 */}
          <img
            src="images/icon/graphic 01.svg"
            className="deco deco-book"
            alt="裝飾小圖"
          />
          <div className="row align-items-center">
            {/* 插畫(上左) */}
            <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
              <img
                src="images/service-img/service.png"
                className="img-fluid"
                style={{ width: "526px" }}
                alt="延續美好生活"
              />
            </div>
            {/* 文字(上右) */}
            <div className="col-12 col-md-6 mb-10 text-md-start">
              <h3 className="h3 mb-3">
                延續美好生活：<span className="text-primary">收購的價值</span>
              </h3>

              <p className="text-muted mb-4">
                物拾 Re:home 致力於推動綠色循環，透過專業且安心的收購流程，
                為您不再需要的家具找到永續的第二人生。
              </p>

              <a href="#" className="btn btn-outline-primary-90 rounded-pill">
                我想找收購
              </a>
            </div>
            {/* 插畫下右 */}
            <div className="col-12 col-md-6 text-center mb-4 mb-md-0 order-md-2">
              {/* 裝飾小圖 */}
              <img
                src="images/icon/graphic 02.svg"
                className="deco deco-lamp"
                alt="deco-lamp"
              />
              <img
                src="images/service-img/service02.png"
                className="img-fluid"
                alt="購買的安心值"
              />
            </div>

            {/* 文字(下左)) */}
            <div className="col-12 col-md-6 text-center text-md-start order-md-1 position-relative">
              {/* 裝飾小圖 */}
              <img
                src="images/icon/graphic 03.svg"
                className="deco deco-chair"
                alt="deco-chair"
              />
              <h3 className="fw-bold mb-3">
                嚴選品質承諾：
                <span className="text-primary">購買的安心值</span>
              </h3>

              <p className="text-muted mb-4">
                我們對每一件收購家具進行嚴格的清潔、檢測與整理， 讓您安心選購。
              </p>

              <a href="#" className="btn btn-outline-primary-90 rounded-pill">
                我想買家具
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* S2 尋找您喜歡的分類商品 */}
      <section
        className="categories-section py-5"
        aria-labelledby="categories-title"
      >
        <div className="categoriesBanner">
          <img
            src="images/background/bg03.png"
            alt="categories Banner"
            className=" w-100 img-fluid"
          />
        </div>

        <div className="container">
          <div className="text-center mt-12 mt-lg-16">
            <img src="images/icon/graphic 04.svg" alt="icon" className="mb-5" />
            <h2 className="h4">尋找您喜歡的分類商品</h2>
          </div>
          {/* 分類選單 */}
          <div className="container">
            <ul className="categories-menu d-flex list-unstyled mb-4 overflow-auto">
              {categoryMenu.map((cat) => (
                <li
                  key={cat}
                  className={`h6 flex-fill text-center pointer text-nowrap px-3 ${activeCategory === cat ? "text-primary" : ""}`}
                  style={{ cursor: "pointer", transition: "0.3s" }}
                  onClick={() => setActiveCategory(cat)}
                >
                  <i className="bi bi-arrow-right arrow me-2"></i>
                  {cat}
                </li>
              ))}
            </ul>
          </div>
          {/* 新品 / 推薦切換 */}
          <div className="text-center mb-6">
            <ul className="d-flex justify-content-center list-unstyled gap-4">
              {["新品", "推薦"].map((t) => (
                <li
                  key={t}
                  className="tab"
                  data-state={activeTab === t ? "unselected" : "selected"}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveTab(t)}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
          {/* 商品展示區 - Swiper */}
          <div className="product-carousel-container m-0 position-relative">
            {filteredProducts.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24} // 卡片間距
                slidesPerView={1.4} // 手機版預設看到 1.3 格
                navigation={{}} // 顯示左右箭頭
                pagination={{ clickable: true }} // 顯示下方分頁點可不可以跳頁的意思
                className="pb-5"
                breakpoints={{
                  768: {
                    slidesPerView: 5, // 桌機（平板以上）
                  },
                }}
              >
                {filteredProducts.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="product-card h-100 p-0 m-0 ">
                      <div className="img-container rounded mb-3">
                        <img
                          src={item.imageUrl}
                          className="img-fluid object-fit-cover w-100"
                          style={{ height: "160px" }}
                          alt={item.title}
                        />
                      </div>
                      <span className="pill text-gray-70 body-text-t-s mb-3">
                        {item.condition_level || "基本款"}
                      </span>
                      <h6 className="h6 mb-3 ">{item.title}</h6>
                      <p className=" body-text-t-m ">
                        ${item.price?.toLocaleString()}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="text-center py-5">
                <p className="text-muted">
                  目前「{activeCategory}」中沒有相關的{activeTab}商品
                </p>
              </div>
            )}
          </div>
          <div className="text-center mb-12 mb-lg-16 mt-5">
            <button className="btn btn-outline-primary-90 rounded-pill px-5">
              瀏覽全部商品
            </button>
          </div>
        </div>
        <Toaster />
      </section>
      {/* S3 主題風格 */}
      <section className="theme-section">
        <div className="container py-12 py-lg-15">
          {/* 標題 */}
          <div className="text-center mb-9">
            <img src="images/icon/graphic 05.svg" alt="" />
            <h2 className="h2">主題風格</h2>
          </div>

          {/* 主題清單 */}
          <div className="row g-8">
            {themes.map((theme) => (
              <div className="col-6 col-md-4 col-lg-3" key={theme.title}>
                <div className="text-center mb-4 ">
                  <div className={`theme-img ${theme.className}`}>
                    <img src={theme.img} alt={theme.alt} />
                    <div className="overlay"></div>
                    <div className="theme-text h3 ">{theme.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* S4 關於我們的服務 */}
      <section className="about-section" aria-labelledby="about-title">
        <div className="container d-flex flex-column justify-content-end">
          <div className="about-content text-center py-12 py-lg-15">
            <div className="mx-auto mb-8">
              <p className="h4 lg-h2">關於我們的服務</p>
              <div className="ellipse-bg mx-auto"></div>
            </div>

            <div className="row g-4 g-lg-8">
              <div className="col-12 col-lg-6">
                <div className="card h-100 py-8 px-4">
                  <div className="text-center mb-5">
                    <img src="images/icon/furniture.svg" alt="furniture" />
                    <h5 className="h6">二手家具收購</h5>
                  </div>
                  <p className="body-text-t-s mb-3">
                    透過物拾的永續循環平台，讓您的家具在下一個家延續故事，
                    不僅減少地球負擔，更能將原本的資源轉化為價值。
                  </p>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="card h-100 py-8 px-4">
                  <div className="text-center mb-5">
                    <img src="images/icon/scanning.svg" alt="scanning" />
                    <h5 className="h6">專業品檢與翻新</h5>
                  </div>
                  <p className="body-text-t-s mb-3">
                    每一件入庫商品都必須通過我們專業技師的「結構穩固檢測」、
                    「深度清潔消毒」及「必要修復整新」。
                  </p>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="card h-100 py-8 px-4">
                  <div className="text-center mb-5">
                    <img
                      src="images/icon/online-shopping.svg"
                      alt="online-shopping"
                    />
                    <h5 className="h6">線上購物</h5>
                  </div>
                  <p className="body-text-t-s mb-3">
                    您可以在家輕鬆瀏覽數百件精選二手家具。
                    每一件商品皆提供多角度實拍圖與詳細規格，
                    消除您對二物件的所有疑慮。
                  </p>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="card h-100 py-8 px-4">
                  <div className="text-center mb-5">
                    <img src="images/icon/delivery.svg" alt="delivery" />
                    <h5 className="h6">安心配送與售後服務</h5>
                  </div>
                  <p className="body-text-t-s mb-3">
                    我們針對不同體積的物件，規劃最適配的運送方案，
                    包括大型家具專屬的到府配送與定位服務， 完善的售後諮詢管道。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* S5 賦予家具新生命 */}
      <section className="renewal-section" aria-labelledby="renewal-title">
        <div className="container my-12 d-flex flex-column justify-content-end">
          <div className="mb-9 d-flex flex-column">
            {/* 左 */}
            <div className="d-flex flex-column flex-lg-row">
              <h3 className="h3">賦予家具新生命：</h3>
              <span className="h3 text-primary-70 mb-5">
                嚴謹把關，安心交付。
              </span>
            </div>

            <div className="flex-lg-row">
              <p className="body-text-t-m text-grey">
                物拾 Re:home
                承諾提供最高標準的收購與再生服務。從您決定割愛的那一刻起，
                我們即啟動一站式專業流程，確保每件家具都能以最優質、
                最衛生的狀態進入下一個家。
              </p>
            </div>
          </div>

          {/* 靠左 */}
          <div className="row">
            <div className="col-12 col-md-3 d-flex justify-content-start mb-12">
              <div className="renewal position-relative mb-12">
                <p className="Body T-L step-label">Step 1</p>
                <img src="images/item-img/item01.png" alt="item01" />
                <h4 className="h4 text-center">專業估價與收件</h4>
              </div>
            </div>

            <div className="col-12 col-md-3 d-flex justify-content-start mb-12">
              <div className="renewal position-relative mb-12">
                <p className="Body T-L step-label">Step 2</p>
                <img src="images/item-img/item02.png" alt="item02" />
                <h4 className="h4 text-center">深度清潔與消毒</h4>
              </div>
            </div>

            <div className="col-md-6 d-none d-md-block"></div>
          </div>

          {/* 靠右 */}
          <div className="row mb-4 justify-content-end">
            {/* 空白占位，讓 Step 3,4 靠右 */}
            <div className="col-md-6 d-none d-md-block"></div>

            <div className="col-12 col-md-3 d-flex justify-content-end mb-12">
              <div className="renewal position-relative mb-4">
                <p className="Body T-L step-label">Step 3</p>
                <img src="images/item-img/item03.png" alt="item03" />
                <h4 className="h4 text-center">檢測與整新修復</h4>
              </div>
            </div>

            <div className="col-12 col-md-3 d-flex justify-content-end">
              <div className="renewal position-relative mb-4">
                <p className="Body T-L step-label">Step 4</p>
                <img src="images/item-img/item04.png" alt="item04" />
                <h4 className="h4 text-center">品質認證與上架</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductCategorySection;
