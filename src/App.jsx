import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
// import { Modal } from 'bootstrap' 使用JS控制Bootstrap元件再打開

function App() {
  useEffect(() => {
    (async () => {
      const res = await axios.get("https://randomuser.me/api/");
      console.log(res);
    })();
  }, []);
  const themes = [
    {
      img: "/src/assets/images/theme/theme01.jpg",
      title: "工業",
      className: "corner-tl",
      alt: "theme01",
    },
    {
      img: "/src/assets/images/theme/theme02.jpg",
      title: "義大利現代",
      className: "",
      alt: "theme02",
    },
    {
      img: "/src/assets/images/theme/theme03.jpg",
      title: "現代北歐",
      className: "",
      alt: "theme03",
    },
    {
      img: "/src/assets/images/theme/theme04.jpg",
      title: "日式無印",
      className: "corner-tr",
      alt: "theme04",
    },
    {
      img: "/src/assets/images/theme/theme05.jpg",
      title: "現代簡約風",
      className: "corner-bl",
      alt: "theme05",
    },
    {
      img: "/src/assets/images/theme/theme06.jpg",
      title: "世紀中期",
      className: "",
      alt: "theme06",
    },
    {
      img: "/src/assets/images/theme/theme07.jpg",
      title: "療癒奶油",
      className: "",
      alt: "theme07",
    },
    {
      img: "/src/assets/images/theme/theme08.jpg",
      title: "宅寂",
      className: "corner-br",
      alt: "theme08",
    },
  ];

  return (
    <>
      <Navbar />
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
              <div className="ellipse-bg mx-auto" />
            </div>

            <div className="row g-4 g-lg-8">
              <div className="col-12 col-lg-6 border">
                <div className="card h-100">
                  <div className="card-body">
                    <img
                      src="/src/assets/images/icon/furniture.svg"
                      alt="furniture"
                    />
                    <h5 className="h6 mb-5">二手家具收購</h5>
                    <p className="mb-3">
                      透過物拾的永續循環平台，讓您的家具在下一個家延續故事，不僅減少地球負擔，更能將原本的資源轉化為價值。
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="card h-100">
                  <div className="card-body">
                    <img
                      src="/src/assets/images/icon/scanning.svg"
                      alt="scanning"
                    />
                    <h5 className="h6">專業品檢與翻新</h5>
                    <p>
                      每一件入庫商品都必須通過我們專業技師的「結構穩固檢測」、「深度清潔消毒」及「必要修復整新」。
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="card h-100">
                  <div className="card-body">
                    <img
                      src="/src/assets/images/icon/online-shopping.svg"
                      alt="online-shopping"
                    />
                    <h5 className="h6">線上購物</h5>
                    <p>
                      您可以在家輕鬆瀏覽數百件精選二手家具。每一件商品皆提供多角度實拍圖與詳細規格，消除您對二物件的所有疑慮。
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="card h-100">
                  <div className="card-body">
                    <img
                      src="/src/assets/images/icon/furniture.svg"
                      alt="pic"
                    />
                    <h5 className="h6">安心配送與售後服務</h5>
                    <p>
                      我們針對不同體積的物件，規劃最適配的運送方案，包括大型家具專屬的到府配送與定位服務，完善的售後諮詢管道。
                    </p>
                  </div>
                </div>
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
