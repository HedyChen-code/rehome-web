import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { Modal } from 'bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slice/cartSlice';
import { useLocation } from 'react-router-dom'; //為了從主題風格連過來

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Products() {
  // Redux
  const dispatch = useDispatch();

  // 所有產品資料
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 所有的篩選狀態
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [style, setStyle] = useState('all');
  const [condition, setCondition] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999);

  // 新品價格排序狀態
  const [sortType, setSortType] = useState('latest');
  // 加入收藏狀態切換
  const [favorites, setFavorites] = useState([]);

  // 產品條件篩選
  const filteredProducts = products.filter((item) => {
    const matchSearch =
      searchTerm === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = category === 'all' || item.category === category;
    const matchStyle = style === 'all' || item.style === style;
    const matchCondition =
      condition === 'all' || item.condition_level === condition;
    const matchMinPrice = minPrice === '' || item.price >= Number(minPrice);
    const matchMaxPrice = maxPrice === '' || item.price <= Number(maxPrice);

    return (
      matchSearch &&
      matchCategory &&
      matchStyle &&
      matchCondition &&
      matchMinPrice &&
      matchMaxPrice
    );
  });

  // 價格滑桿 (slider)
  const minLimit = 0;
  const maxLimit = 10000;
  const handleMinChange = (e) => {
    const value = parseInt(e.target.value);
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };
  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };

  // 清除所有條件
  const clearFilters = () => {
    setCategory('all');
    setStyle('all');
    setCondition('all');
    setMinPrice(0);
    setMaxPrice(999999);
    setSearchTerm('');
  };

  // 最新上架/價格排序
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortType === 'latest') {
      return b.id.localeCompare(a.id);
    }
    if (sortType === 'priceHighToLow') {
      return b.price - a.price; // 價格高到低
    }
    if (sortType === 'priceLowToHigh') {
      return a.price - b.price; // 價格低到高
    }

    return 0;
  });

  // 分頁狀態
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = sortedProducts.slice(startIndex, startIndex + pageSize);

  // 加入收藏的商品
  const handleFavorite = (e, id) => {
    e.preventDefault();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // 取得所有商品函式
  const getProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`);
      setProducts(res.data.products);
      console.log(res.data.products);
    } catch (error) {
      toast.error(
        `取得所有商品資料失敗: ${error.response?.data?.message}，請洽工作人員`,
      );
    }
  };

  // 加入購物車函式
  const handleAddToCart = (e, product) => {
    dispatch(addToCart(product));
    toast.success(`已將 ${product.title} 加入購物車`);
  };

  const location = useLocation(); //為了從主題風格連過來
  const incomingStyle = location.state?.selectedTheme; //為了從主題風格連過來
  useEffect(() => {
    getProducts();
  }, []);

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [category, style, condition, minPrice, maxPrice, searchTerm]);

  // 手機版備註欄：Modal 開啟/關閉
  const modalRef = useRef(null);
  const notesModal = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      notesModal.current = new Modal(modalRef.current, {
        backdrop: 'static',
        keyboard: true,
      });
    }

    return () => {
      if (notesModal.current) {
        notesModal.current.dispose();
      }
    };
  }, []);

  const openModal = () => notesModal.current.show();
  const closeModal = () => notesModal.current.hide();

  useEffect(() => {
    if (incomingStyle) {
      setStyle(incomingStyle);
    }
  }, [incomingStyle]);

  const incomingKeyword = location.state?.keyword; // 取得傳過來的關鍵字

  // 新增：處理從導航列傳來的搜尋關鍵字

  useEffect(() => {
    if (incomingKeyword) {
      setSearchTerm(incomingKeyword);

      // 建議選做：清除 state 避免重新整理頁面時一直觸發篩選

      window.history.replaceState({}, document.title);
    }
  }, [incomingKeyword]);

  return (
    <>
      <main>
        {/* 商品頁上方橫幅圖區塊 */}
        <section className="banner">
          <div className="container custom-container px-0">
            <picture>
              <source
                srcSet="./images/banner/banner05.png"
                media="(min-width: 768px)"
              />
              <img
                src="./images/banner/banner06.png"
                alt="Banner"
                className="w-100"
              />
            </picture>
          </div>
        </section>
        {/* 商品頁橫幅圖下方區塊 */}
        <section className="py-lg-12 mb-5 mb-lg-12">
          {/* 麵包屑區塊 */}
          <nav className="container mb-9 d-none d-lg-block">
            <ol className="breadcrumb">
              <li className="...">
                <a className="text-reset" href="#">
                  首頁
                </a>
              </li>
              <li className="mx-8">
                <small>
                  <i className="bi bi-chevron-right"></i>
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
                <section className="bg-light-gray px-5 py-9 mb-5 mb-lg-9 mx-n4">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <h5>篩選器</h5>
                    {/* 手機版備註欄：Modal 開啟與關閉按鈕*/}
                    <button
                      className="d-block d-lg-none btn p-0 font-family-noto-sans text-primary-50 d-flex justify-content-center align-items-center"
                      onClick={openModal}
                    >
                      <span className="me-3 fs-9">備註</span>
                      <i className="bi bi-exclamation-circle"></i>
                    </button>
                  </div>
                  {/* 關鍵字搜尋篩選 */}
                  <div className="input-group mb-5">
                    <input
                      type="text"
                      className="form-control custom-input-text"
                      placeholder="請輸入關鍵字"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                      className="btn btn-primary"
                      type="button"
                      id="button-addon"
                    >
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                  {/* 類別/風格/中古程度篩選 */}
                  <div className="d-flex flex-md-column">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={`form-select mb-5 me-5 ${category === 'all' ? 'text-gray-30' : 'text-gray-90'}`}
                    >
                      <option value="all">請選擇類別</option>
                      <option value="沙發 / 座椅類">沙發 / 座椅類</option>
                      <option value="儲物 / 櫃體類">儲物 / 櫃體類</option>
                      <option value="床具 / 寢臥類">床具 / 寢臥類</option>
                      <option value="桌類 / 檯面類">桌類 / 檯面類</option>
                      <option value="擺飾 / 家飾類">擺飾 / 家飾類</option>
                    </select>
                    <select
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      className={`form-select mb-5 ${style === 'all' ? 'text-gray-30' : 'text-gray-90'}`}
                    >
                      <option value="all">請選擇風格</option>
                      <option value="工業">工業</option>
                      <option value="義大利現代">義大利現代</option>
                      <option value="現代北歐">現代北歐</option>
                      <option value="日式無印">日式無印</option>
                      <option value="現代簡約風">現代簡約風</option>
                      <option value="世紀中期">世紀中期</option>
                      <option value="療癒奶油">療癒奶油</option>
                      <option value="侘寂">侘寂</option>
                    </select>
                  </div>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className={`form-select mb-5 ${condition === 'all' ? 'text-gray-30' : 'text-gray-90'}`}
                  >
                    <option value="all">請選擇中古程度</option>
                    <option value="中古Ａ">中古程度 A</option>
                    <option value="中古Ｂ">中古程度 B</option>
                    <option value="中古Ｃ">中古程度 C</option>
                    <option value="中古Ｄ">中古程度 D</option>
                  </select>
                  {/* 價格篩選 */}
                  <h6 className="fs-8 text-gray-90 mb-3">價格範圍</h6>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column mb-3 me-5">
                      <label
                        htmlFor="minPrice"
                        className="form-label fs-9 text-gray-50"
                      >
                        min.
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="minPrice"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </div>
                    <div className="d-flex flex-column mb-3">
                      <label
                        htmlFor="manPrice"
                        className="form-label fs-9 text-gray-50"
                      >
                        max.
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="maxPrice"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* 價格滑桿 */}
                  <label htmlFor="rangeMax" className="fs-9">
                    min.
                  </label>
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
                  <label htmlFor="rangeMax" className="fs-9">
                    max.
                  </label>
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
                  {/* 篩選結果 */}
                  <p className="font-family-noto-sans">
                    篩選結果共
                    <span className="text-primary-70 fs-5">
                      {' '}
                      {filteredProducts.length}{' '}
                    </span>
                    筆
                  </p>
                  {/* 清除篩選 */}
                  <button
                    type="button"
                    className="btn btn-gray-20 btn-sm p-0 ms-2 custom-btn font-family-noto-sans fs-8"
                    onClick={clearFilters}
                  >
                    清除篩選
                    <i className="bi bi-x text-gray-70"></i>
                  </button>
                </section>
                {/* 新品價格排序選擇器 */}
                <select
                  className="form-select mb-5 text-gray-95 ms-auto custom-select-w"
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                >
                  <option value="latest">最新上架</option>
                  <option value="priceHighToLow">價格由高到低</option>
                  <option value="priceLowToHigh">價格由低到高</option>
                </select>
                {/* 卡片區塊 */}
                <div className="row">
                  {currentItems.map((item) => (
                    <div className="col-6 col-md-4 mb-8" key={item.id}>
                      <div className="card h-auto border-0 px-3">
                        <section className="card-container mb-3">
                          <img
                            src={item.imageUrl}
                            className="card-img-top object-fit-cover"
                            style={{ height: '200px' }} // 固定高度
                            alt={item.title}
                          />
                          {/* 加入收藏按鈕 */}
                          <button
                            type="button"
                            className="favorite-btn"
                            onClick={(e) => handleFavorite(e, item.id)}
                          >
                            <i
                              className={`bi ${favorites.includes(item.id) ? 'bi-heart-fill text-primary-10' : 'bi-heart text-white'}`}
                            ></i>
                          </button>
                        </section>
                        <section className="mb-3">
                          <span className="badge rounded-pill text-bg-secondary-10 text-gray-70 me-3">
                            {item.condition_level}
                          </span>
                          <span className="badge rounded-pill text-bg-secondary-10 text-gray-70">
                            {item.color}
                          </span>
                        </section>
                        <div className="card-body d-flex flex-column p-0">
                          {/* text-truncate 防止標題過長 */}
                          <h5 className="card-title text-truncate">
                            {item.title}
                          </h5>
                          <p
                            className="card-text text-secondary"
                            style={{ fontSize: '0.9rem' }}
                          >
                            {/* 限制描述文字行數 */}
                            {item.story?.length > 50
                              ? `${item.story.substring(0, 50)}...`
                              : item.story}
                          </p>
                          <button
                            className="btn p-0 mt-n4 stretched-link text-white "
                            onClick={() => handleView(item.id)}
                          >
                            {/* 查看細節 */}
                          </button>
                          <div>
                            <p className="card-text text-end">
                              <del className="text-muted">
                                ${item.origin_price}
                              </del>
                              <span className="text-danger ms-2 fw-bold">
                                ${item.price}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-light w-100 custom-btn-hover"
                        onClick={(e) => handleAddToCart(e, item)}
                      >
                        加入購物車
                        <i className="bi bi-cart3 ms-3"></i>
                      </button>
                    </div>
                  ))}
                </div>
                {/* 分頁區塊 */}
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${currentPage === 1 && 'disabled'}`}
                    >
                      <a
                        className="page-link border-0"
                        href="#"
                        aria-label="Previous"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((prev) => prev - 1);
                        }}
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                        key={index}
                      >
                        <a
                          className="page-link border-0"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(index + 1);
                          }}
                        >
                          {index + 1}
                        </a>
                      </li>
                    ))}
                    <li
                      className={`page-item ${currentPage === totalPages && 'disabled'}`}
                    >
                      <a
                        className="page-link border-0"
                        href="#"
                        aria-label="Next"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((prev) => prev + 1);
                        }}
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Modal */}
      <div className="modal" ref={modalRef} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered p-8">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title">備註：</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body font-family-noto-sans">
              <div className="mb-4">
                <span className="badge rounded-pill text-bg-secondary-10 text-gray-70 mb-2">
                  中古程度 A
                </span>
                <p className="fs-8">
                  外觀完美如新，無明顯可見的磨損、刮痕或污漬，功能完好。
                </p>
              </div>
              <div className="mb-4">
                <span className="badge rounded-pill text-bg-secondary-10 text-gray-70 mb-2">
                  中古程度 B
                </span>
                <p className="fs-8">
                  有正常使用下極輕微的痕跡，不影響整體美觀與功能。
                </p>
              </div>
              <div className="mb-4">
                <span className="badge rounded-pill text-bg-secondary-10 text-gray-70 mb-2">
                  中古程度 C
                </span>
                <p className="fs-8">
                  有中度使用痕跡，如輕微刮傷或小掉漆，功能性完全正常。
                </p>
              </div>
              <div className="mb-4">
                <span className="badge rounded-pill text-bg-secondary-10 text-gray-70 mb-2">
                  中古程度 D
                </span>
                <p className="fs-8">
                  有明顯的磨損、污漬或老化痕跡。功能可能受輕微影響、或需部分維修，狀態可瀏覽各自商品描述中的說明。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
export default Products;
