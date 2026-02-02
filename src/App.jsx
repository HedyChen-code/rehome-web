import { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Footer from './layout/Footer';
import Navbar from './layout/Navbar';
// import { Modal } from 'bootstrap' 使用JS控制Bootstrap元件再打開

function App() {
  useEffect(() => {
    (async () => {
      const res = await axios.get('https://randomuser.me/api/');
      console.log(res);
    })();
  }, []);
  const themes = [
    {
      img: '/src/assets/images/theme/theme01.jpg',
      title: '工業',
      className: 'corner-tl',
      alt: 'theme01',
    },
    {
      img: '/src/assets/images/theme/theme02.jpg',
      title: '義大利現代',
      className: '',
      alt: 'theme02',
    },
    {
      img: '/src/assets/images/theme/theme03.jpg',
      title: '現代北歐',
      className: '',
      alt: 'theme03',
    },
    {
      img: '/src/assets/images/theme/theme04.jpg',
      title: '日式無印',
      className: 'corner-tr',
      alt: 'theme04',
    },
    {
      img: '/src/assets/images/theme/theme05.jpg',
      title: '現代簡約風',
      className: 'corner-bl',
      alt: 'theme05',
    },
    {
      img: '/src/assets/images/theme/theme06.jpg',
      title: '世紀中期',
      className: '',
      alt: 'theme06',
    },
    {
      img: '/src/assets/images/theme/theme07.jpg',
      title: '療癒奶油',
      className: '',
      alt: 'theme07',
    },
    {
      img: '/src/assets/images/theme/theme08.jpg',
      title: '宅寂',
      className: 'corner-br',
      alt: 'theme08',
    },
  ];

  return (
    <>
      <Navbar />
      {/* Hero 大圖輪播 */}
      <section className="hero-section" data-aos="fade-right">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="carousel-inner">
            {/* 輪播項目 1 */}
            <div className="carousel-item active">
              <img
                src="/src/assets/images/banner/banner01.png"
                className="d-block w-100"
                alt="banner01"
              />
              <div
                className="carousel-caption d-flex align-items-center justify-content-center"
                style={{
                  top: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.2)',
                }}
              >
                <div
                  className="text-center"
                  style={{ maxWidth: '760px', animation: 'fadeIn 1s' }}
                >
                  <p className="h1 text-white">質感生活，不必高價擁有</p>
                  <p className="h6 text-white">
                    物拾嚴選：經專業處理與清潔，讓您放心添購優質二手設計。
                  </p>
                </div>
              </div>
            </div>

            {/* 輪播項目 2 */}
            <div className="carousel-item">
              <img
                src="/src/assets/images/banner/banner02.png"
                className="d-block w-100"
                alt="banner02"
              />
              <div
                className="carousel-caption d-flex align-items-center justify-content-center"
                style={{
                  top: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.2)',
                }}
              >
                <div
                  className="text-center"
                  style={{ maxWidth: '760px', animation: 'fadeIn 1s' }}
                >
                  <p className="h1 text-white">空間換新，輕鬆啟動</p>
                  <p className="h6 text-white">
                    專業團隊上門服務，為您閒置的優質家具高效估價與收購。
                  </p>
                </div>
              </div>
            </div>

            {/* 輪播項目 3 */}
            <div className="carousel-item">
              <img
                src="/src/assets/images/banner/banner03.png"
                className="d-block w-100"
                alt="banner03"
              />
              <div
                className="carousel-caption d-flex align-items-center justify-content-center"
                style={{
                  top: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.2)',
                }}
              >
                <div
                  className="text-center"
                  style={{ maxWidth: '760px', animation: 'fadeIn 1s' }}
                >
                  <p className="h1 text-white">尋找有故事的獨特設計</p>
                  <p className="fs-8 fs-lg-3 my-3 mx-5 text-white">
                    曾經的使用痕跡是生活的溫度與意義，讓每次選購、都像收藏一段生活。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* 淡入動畫 */}
        <style>{`
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .carousel-caption > div {
      animation-fill-mode: both;
    }
  `}</style>
      </section>

      {/* S1延續美好生活 */}
      <section className="service-section my-16">
        <div className="container position-relative">
          {/* 裝飾小圖 */}
          <img
            src="/src/assets/images/icon/graphic 01.svg"
            className="deco deco-book"
            alt=""
          />
          <div className="row align-items-center">
            {/* 插畫(上左) */}
            <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
              <img
                src="/src/assets/images/service-img/service.png"
                className="img-fluid"
                style={{ width: '526px' }}
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

              <a href="#" className="btn btn-outline-primary">
                我想找收購
              </a>
            </div>
            {/* 插畫下右 */}
            <div className="col-12 col-md-6 text-center mb-4 mb-md-0 order-md-2">
              {/* 裝飾小圖 */}
              <img
                src="/src/assets/images/icon/graphic 02.svg"
                className="deco deco-lamp"
                alt="deco-lamp"
              />
              <img
                src="/src/assets/images/service-img/service02.png"
                className="img-fluid"
                alt="購買的安心值"
              />
            </div>

            {/* 文字(下左)) */}
            <div className="col-12 col-md-6 text-center text-md-start order-md-1 position-relative">
              {/* 裝飾小圖 */}
              <img
                src="/src/assets/images/icon/graphic 03.svg"
                className="deco deco-chair"
                alt="deco-chair"
              />
              <h3 className="fw-bold mb-3">
                嚴選品質承諾：<span className="text-primary">購買的安心值</span>
              </h3>

              <p className="text-muted mb-4">
                我們對每一件收購家具進行嚴格的清潔、檢測與整理， 讓您安心選購。
              </p>

              <a href="#" className="btn btn-outline-primary">
                我想買家具
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* S2 尋找您喜歡的分類商品 */}
      <section
        className="categories-section"
        aria-labelledby="categories-title"
      >
        <div className="categoriesBanner">
          <img
            src="/src/assets/images/background/bg03.png"
            alt="categories Banner"
            className="img-fluid w-100"
          />
        </div>

        <div className="container">
          <div className="text-center mt-12 mt-lg-16">
            <img
              src="/src/assets/images/icon/graphic 04.svg"
              alt="categories-section"
              className="mb-5"
            />
            <h2 className="h4">尋找您喜歡的分類商品</h2>
          </div>

          <div>
            <ul className="categories-menu d-flex list-unstyled mb-4">
              <li className="h6 flex-fill text-center">
                <i className="bi bi-arrow-right arrow me-2"></i>
                沙發 / 座椅類
              </li>
              <li className="h6 flex-fill text-center">
                <i className="bi bi-arrow-right arrow me-2"></i>
                儲物 / 櫃體類
              </li>
              <li className="h6 flex-fill text-center">
                <i className="bi bi-arrow-right arrow me-2"></i>
                床具 / 寢臥類
              </li>
              <li className="h6 flex-fill text-center">
                <i className="bi bi-arrow-right arrow me-2"></i>
                桌類 / 檯面類
              </li>
              <li className="h6 flex-fill text-center">
                <i className="bi bi-arrow-right arrow me-2"></i>
                擺飾 / 家飾類
              </li>
            </ul>
          </div>

          <div className="text-center mb-6">
            <ul>
              <li className="tab" data-state="unselected">
                新品
              </li>
              <li className="tab" data-state="unselected">
                推薦
              </li>
            </ul>
          </div>

          {/* 卡片區 */}
          <div className="product-carousel">
            <div className="product-card">
              <img
                src="/src/assets/images/product/product01.jpg"
                className="img-fluid rounded mb-4"
                alt="product01"
              />
              <span className="pill text-gray-70 body-text-t-s mb-3">
                中古程度 B
              </span>
              <h6 className="h6 mb-3">北歐實木三人座沙發</h6>
              <p className="body-text-t-m">$18,500</p>
            </div>

            <div className="product-card">
              <img
                src="/src/assets/images/product/product04.jpg"
                className="img-fluid rounded mb-4"
                alt="product04"
              />
              <span className="pill text-gray-70 body-text-t-s mb-3">
                中古程度Ａ
              </span>
              <h6 className="h6 mb-3">經典款原木餐桌</h6>
              <p className="body-text-t-m">$9,200</p>
            </div>

            <div className="product-card">
              <img
                src="/src/assets/images/product/product02.jpg"
                className="img-fluid rounded mb-4"
                alt="product02"
              />
              <span className="pill text-gray-70 body-text-t-s mb-3">
                中古程度Ａ
              </span>
              <h6 className="h6 mb-3">米白色羊羔絨單椅</h6>
              <p className="body-text-t-m">$5,990</p>
            </div>

            <div className="product-card">
              <img
                src="/src/assets/images/product/product05.jpg"
                className="img-fluid rounded mb-4"
                alt="product05"
              />
              <span className="pill text-gray-70 body-text-t-s mb-3">
                中古程度 B
              </span>
              <h6 className="h6 mb-3">三層抽屜斗櫃</h6>
              <p className="body-text-t-m">$6,500</p>
            </div>

            <div className="product-card">
              <img
                src="/src/assets/images/product/product03.jpg"
                className="img-fluid rounded mb-4"
                alt="product03"
              />
              <span className="pill text-gray-70 body-text-t-s mb-3">
                中古程度 B
              </span>
              <h6 className="h6 mb-3">設計師款造型吊燈</h6>
              <p className="body-text-t-m">$2,999</p>
            </div>
          </div>

          <div className="text-center mb-12 mb-lg-16">
            <button className="btn-pr">瀏覽全部商品</button>
          </div>
        </div>
      </section>

      {/* S3 主題風格 */}
      <section className="theme-section">
        <div className="container py-12 py-lg-15">
          {/* 標題 */}
          <div className="text-center mb-9">
            <img src="/src/assets/images/icon/graphic 05.svg" alt="" />
            <h2 className="h2">主題風格</h2>
          </div>

          {/* 主題清單 */}
          <div className="row g-8">
            {themes.map((theme, index) => (
              <div className="col-6 col-md-4 col-lg-3" key={theme.title}>
                <div className="text-center mb-4">
                  <div className={`theme-img ${theme.className}`}>
                    <img src={theme.img} alt={theme.alt} />
                    <div className="theme-text h3">{theme.title}</div>
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
                    <img
                      src="/src/assets/images/icon/furniture.svg"
                      alt="furniture"
                    />
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
                    <img
                      src="/src/assets/images/icon/scanning.svg"
                      alt="scanning"
                    />
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
                      src="/src/assets/images/icon/online-shopping.svg"
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
                    <img
                      src="/src/assets/images/icon/delivery.svg"
                      alt="delivery"
                    />
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
                <img
                  src="/src/assets/images/item-img/item01.png"
                  alt="item01"
                />
                <h4 className="h4 text-center">專業估價與收件</h4>
              </div>
            </div>

            <div className="col-12 col-md-3 d-flex justify-content-start mb-12">
              <div className="renewal position-relative mb-12">
                <p className="Body T-L step-label">Step 2</p>
                <img
                  src="/src/assets/images/item-img/item02.png"
                  alt="item02"
                />
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
                <img
                  src="/src/assets/images/item-img/item03.png"
                  alt="item03"
                />
                <h4 className="h4 text-center">檢測與整新修復</h4>
              </div>
            </div>

            <div className="col-12 col-md-3 d-flex justify-content-end">
              <div className="renewal position-relative mb-4">
                <p className="Body T-L step-label">Step 4</p>
                <img
                  src="/src/assets/images/item-img/item04.png"
                  alt="item04"
                />
                <h4 className="h4 text-center">品質認證與上架</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
