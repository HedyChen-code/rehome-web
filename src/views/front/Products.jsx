import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Products() {
  // 所有產品資料
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 篩選器：文字顏色動態變化
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState("");
  const [oldDegree, setOldDegree] = useState("");

  // 價格篩選器
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const minLimit = 0;
  const maxLimit = 10000;
  const handleMinChange = (e) => {
    const value = parseInt(e.target.value);
    // 邏輯判斷：最低價不能高於目前的最大價
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };
  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value);
    // 邏輯判斷：最高價不能低於目前的最小價
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };

  // 取得所有商品資料
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`);
        setProducts(res.data.products);
      } catch (error) {
        toast.error(
          `取得所有商品資料失敗: ${error.response?.data?.message}，請洽工作人員`,
        );
      }
    };
    getData();
  }, []);

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <main>
        {/* 商品頁上方橫幅圖區塊 */}
        <section className="banner">
          <div className="container px-0">
            <picture>
              <source
                srcset="./images/banner/banner05.png"
                media="(min-width: 768px)"
              />
              <img
                src="./images/banner/banner06.png"
                alt="Banner"
                className="w-100"
              />
            </picture>
            {/* <img
              className="img-fluid"
              src="./images/banner/banner05.png"
              alt="..."
            /> */}
          </div>
        </section>
        <section className="py-12">
          {/* 麵包屑區塊 */}
          <nav className="container mb-9">
            <ol className="breadcrumb">
              <li className="...">
                <a className="text-reset" href="#">
                  首頁
                </a>
              </li>
              <li className="mx-8">
                <small>
                  <i class="bi bi-chevron-right"></i>
                </small>
              </li>
              <li className="text-primary-70">所有商品</li>
            </ol>
          </nav>
          {/* 主要內容區塊 */}
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                {/* 篩選器區塊 */}
                <section className="bg-light-grey px-5 py-9 mb-9">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <h5>篩選器</h5>
                    <button className="d-block d-lg-none btn p-0 font-family-noto-sans text-primary-50 d-flex justify-content-center align-items-center">
                      <span className="me-3 fs-9">備註</span>
                      <i class="bi bi-exclamation-circle"></i>
                    </button>
                  </div>
                  {/* 關鍵字搜尋篩選 */}
                  <div className="input-group mb-5">
                    <input
                      type="text"
                      className="form-control custom-input-text"
                      placeholder="請輸入關鍵字"
                    />
                    <button
                      className="btn btn-primary"
                      type="button"
                      id="button-addon"
                    >
                      <i class="bi bi-search"></i>
                    </button>
                  </div>
                  {/* 類別/風格/中古程度篩選 */}
                  <div className="d-flex flex-md-column">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={`form-select mb-5 me-5 ${category === "" ? "text-gray-30" : "text-gray-90"}`}
                    >
                      <option value="" disabled selected>
                        請選擇類別
                      </option>
                      <option value="1">沙發 / 座椅類</option>
                      <option value="2">儲物 / 櫃體類</option>
                      <option value="3">床具 / 寢臥類</option>
                      <option value="4">桌類 / 檯面類</option>
                      <option value="5">擺飾 / 家飾類</option>
                    </select>
                    <select
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      className={`form-select mb-5 ${style === "" ? "text-gray-30" : "text-gray-90"}`}
                    >
                      <option value="" disabled selected>
                        請選擇風格
                      </option>
                      <option value="1">工業</option>
                      <option value="2">義大利現代</option>
                      <option value="3">現代北歐</option>
                      <option value="4">日式無印</option>
                      <option value="5">現代簡約風</option>
                      <option value="6">世紀中期</option>
                      <option value="7">療癒奶油</option>
                      <option value="8">侘寂</option>
                    </select>
                  </div>
                  <select
                    value={oldDegree}
                    onChange={(e) => setOldDegree(e.target.value)}
                    className={`form-select mb-5 ${oldDegree === "" ? "text-gray-30" : "text-gray-90"}`}
                  >
                    <option value="" disabled selected>
                      請選擇中古程度
                    </option>
                    <option value="1">中古程度 A</option>
                    <option value="2">中古程度 B</option>
                    <option value="3">中古程度 C</option>
                    <option value="4">中古程度 D</option>
                  </select>
                  {/* 價格篩選 */}
                  <h6 className="fs-8 text-gray-90 mb-3">價格範圍</h6>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column mb-3 me-5">
                      <label
                        for="minPrice"
                        className="form-label fs-9 text-gray-50"
                      >
                        min.
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="minPrice"
                        value={minPrice}
                      />
                    </div>
                    <div className="d-flex flex-column mb-3">
                      <label
                        for="manPrice"
                        className="form-label fs-9 text-gray-50"
                      >
                        max.
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="maxPrice"
                        value={maxPrice}
                      />
                    </div>
                  </div>
                  {/* 價格高低篩選範圍條 */}
                  <input
                    type="range"
                    className="form-range"
                    min={minLimit}
                    max={maxLimit}
                    step="100"
                    id="rangeMin"
                    value={minPrice}
                    onChange={handleMinChange}
                  />
                  <input
                    type="range"
                    className="form-range"
                    min={minLimit}
                    max={maxLimit}
                    step="100"
                    id="rangeMax"
                    value={maxPrice}
                    onChange={handleMaxChange}
                  />
                </section>
                {/* 篩選器下方的備註區塊 */}
                <section className="font-family-noto-sans px-5 py-9 d-none d-lg-block">
                  <h6 className="mb-8">備註：</h6>
                  <div className="mb-8">
                    <span className="badge rounded-pill text-bg-secondary-10 text-gray-70 mb-3">
                      中古程度 A
                    </span>
                    <p className="fs-9">
                      外觀完美如新，無明顯可見的磨損、刮痕或污漬，功能完好。
                    </p>
                  </div>
                  <div className="mb-8">
                    <span className="badge rounded-pill text-bg-secondary-10 text-gray-70 mb-3">
                      中古程度 B
                    </span>
                    <p className="fs-9">
                      有正常使用下極輕微的痕跡，不影響整體美觀與功能。
                    </p>
                  </div>
                  <div className="mb-8">
                    <span className="badge rounded-pill text-bg-secondary-10 text-gray-70 mb-3">
                      中古程度 C
                    </span>
                    <p className="fs-9">
                      有中度使用痕跡，如輕微刮傷或小掉漆，功能性完全正常。
                    </p>
                  </div>
                  <div className="mb-8">
                    <span className="badge rounded-pill text-bg-secondary-10 text-gray-70 mb-3">
                      中古程度 D
                    </span>
                    <p className="fs-9">
                      有明顯的磨損、污漬或老化痕跡。功能可能受輕微影響、或需部分維修，狀態可瀏覽各自商品描述中的說明。
                    </p>
                  </div>
                </section>
              </div>
              <div className="col-lg-9">
                <section className="d-flex justify-content-between border-bottom py-3 mb-8">
                  <p className="font-family-noto-sans">
                    篩選結果共
                    <span className="text-primary-70 fs-5"> 10,357 </span>筆
                  </p>
                  <div className="custom-badge font-family-noto-sans bg-gray-20 fs-8">
                    清除篩選
                    <button
                      type="button"
                      className="btn btn-gray-20 btn-sm p-0 ms-2"
                    >
                      <i className="bi bi-x text-gray-70"></i>
                    </button>
                  </div>
                </section>
                <select className="form-select mb-5 text-gray-95 w-25 ms-auto">
                  <option value="1">最新上架</option>
                  <option value="2">價格由高到低</option>
                  <option value="3">價格由低到高</option>
                </select>

                <div className="row">
                  {products.map((item) => (
                    <div className="col-6 col-md-4 mb-4" key={item.id}>
                      <div className="card h-100 border-0 px-3">
                        {/* h-100 讓同列卡片等高 */}
                        <section className="card-container mb-3">
                          <img
                            src={item.imageUrl}
                            className="card-img-top object-fit-cover"
                            style={{ height: "200px" }} // 固定高度
                            alt={item.title}
                          />
                          <button type="button" className="favorite-btn">
                            <i class="bi bi-heart text-white"></i>
                          </button>
                        </section>
                        <section className="mb-3">
                          <span className="badge rounded-pill text-bg-secondary-10 text-gray-70 me-3">
                            中古程度 B
                          </span>
                          <span className="badge rounded-pill text-bg-secondary-10 text-gray-70">
                            使用 3 年
                          </span>
                        </section>
                        <div className="card-body d-flex flex-column p-0">
                          <h5 className="card-title text-truncate">
                            {item.title}
                          </h5>
                          {/* text-truncate 防止標題過長 */}
                          <p
                            className="card-text text-secondary"
                            style={{ fontSize: "0.9rem" }}
                          >
                            {/* 限制描述文字行數 */}
                            {item.story?.length > 50
                              ? `${item.story.substring(0, 50)}...`
                              : item.story}
                          </p>
                          <div className="mt-auto">
                            {/* mt-auto 將價格與按鈕推至底部對齊 */}
                            <p className="card-text text-end mb-3">
                              <del className="text-muted">
                                ${item.origin_price}
                              </del>
                              <span className="text-danger ms-2 fw-bold">
                                ${item.price}
                              </span>
                            </p>
                            <button
                              className="btn btn-primary w-100"
                              onClick={() => handleView(item.id)}
                            >
                              加入購物車
                              <i class="bi bi-cart3 ms-3"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
export default Products;
