import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";

function Offcanvas({ isOpen, close, type, setPage }) {
  return (
    <div
      className={`offcanvas offcanvas-top h-100 ${
        type === "search" ? "bg-primary-90 bg-opacity-75" : "bg-primary-10"
      }  ${isOpen ? "show" : ""}`}
      style={{ visibility: isOpen ? "visible" : "hidden" }}
    >
      <div
        className={`justify-content-end p-4 ${
          type === "search" ? "d-none" : "d-flex"
        }`}
      >
        <button
          className="rounded-circle bg-white p-5  border-0"
          onClick={close}
        >
          <i className="bi bi-x nav-icon"></i>
        </button>
      </div>
      {type === "menu" && <MenuContent setPage={setPage} close={close} />}
      {type === "search" && <SearchContent close={close} />}
    </div>
  );
}
// 選單
function MenuContent({ close }) {
  // 取得 Redux 中的購物車列表與數量
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <>
      <div className="offcanvas-body py-5 px-4">
        <ul className="navbar-nav justify-content-center align-items-center flex-grow-1 mb-8 border-bottom border-primary-30">
          <li className="nav-item pb-2">
            <NavLink
              className="nav-link fs-6 text-black px-5 py-4"
              to="/products"
              onClick={close}
            >
              商品系列
            </NavLink>
          </li>
          <li className="nav-item pb-2">
            <NavLink to="/" className="nav-link fs-6 text-black px-5 py-4">
              風格嚴選
            </NavLink>
          </li>
          <li className="nav-item pb-2">
            <NavLink
              className="nav-link fs-6 text-black px-5 py-4"
              to="/TradeGuide"
              onClick={close}
            >
              關於收購
            </NavLink>
          </li>
          <li className="nav-item pb-2">
            <NavLink to="/" className="nav-link fs-6 text-black px-5 py-4">
              品牌故事
            </NavLink>
          </li>
          <li className="nav-item pb-2">
            <NavLink to="/" className="nav-link fs-6 text-black px-5 py-4">
              連絡我們
            </NavLink>
          </li>
          <li className="nav-item pb-5">
            <NavLink to="/" className="nav-link fs-6 text-black px-5 py-4">
              查看購物車
              {cartCount > 0 && (
                <span className="badge rounded-pill bg-danger ms-2">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </li>
        </ul>
        <div className="d-flex justify-content-center align-items-center">
          <NavLink
            to="/"
            className="btn btn-outline-primary py-4 px-8 me-4 rounded-5"
          >
            註冊
          </NavLink>
          <NavLink to="/" className="btn btn-primary py-4 px-8 me-4 rounded-5">
            登入
          </NavLink>
        </div>
      </div>
      <div className="offcanvas-footer text-center mb-5">
        <img src="images/logo/logo v2.svg" alt="logo" />
      </div>
    </>
  );
}
// 搜尋
function SearchContent({ close }) {
  return (
    <div className="offcanvas-body d-flex flex-column justify-content-center ps-8 pe-4">
      <div className="d-flex">
        <input
          typeof="search"
          className="search-input"
          placeholder="搜尋"
          autoFocus
        />
        <div className="icon-wrapper p-5">
          <div
            className="bg-transparent border-0 shadow-none p-0"
            role="button"
          >
            <i className="bi bi-search text-white nav-icon"></i>
          </div>
        </div>
        <button
          className="bg-transparent p-5 border-0 icon-wrapper"
          onClick={close}
        >
          <i className="bi bi-x nav-icon text-white"></i>
        </button>
      </div>
    </div>
  );
}

const Navbar = ({ setPage, variant = "default" }) => {
  // 取得 Redux 中的購物車列表與數量
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

  // 手機板-漢堡選單、搜尋選單
  const [isOpen, setIsOpen] = useState(false);
  const [navType, setNavType] = useState("");
  // 監聽滾輪
  const [isScrolled, setIsScrolled] = useState(false);
  // 首頁的話另外的效果
  const isHome = variant === "home";

  // 監聽滾輪
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // 50px 就觸發
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 如果不是首頁，強制視為滾動後的狀態
  const shrink = isHome ? isScrolled : true;

  // LOGO會用到的圖片
  const logoSrcMap = {
    home: "images/logo/logo v2_white.svg",
    homeSmall: "images/logo/logo v2_white.svg",
    default: "images/logo/logo v2.svg",
  };
  // 判斷頁面來切換圖片
  let logoSrc;
  if (isHome) {
    logoSrc = logoSrcMap.home;
  } else {
    logoSrc = isScrolled ? logoSrcMap.homeSmall : logoSrcMap.default;
  }

  // 搜尋放大鏡，首頁永遠白色
  // 內頁沒滾動 → 黑色，滾動後 → 白色
  const iconColorClass = isHome
    ? "text-white"
    : isScrolled
      ? "text-white"
      : "text-gray-70";

  return (
    <header>
      {/* 手機版導覽列 */}
      <nav
        className={`navbar navbar-light fixed-top d-lg-none p-4
    ${isScrolled ? "bg-primary-90 bg-opacity-75" : ""}  `}
      >
        <div className="container-fluid align-items-start p-0">
          <NavLink className="" to="/">
            <img
              src={logoSrc}
              alt="logo"
              className={`logo-img ${shrink ? "logo-small" : ""}`}
            />
          </NavLink>

          <div className="d-flex">
            <div className="me-3 p-5">
              {/* 搜尋按鈕 */}
              <div
                className="bg-transparent border-0 shadow-none p-0"
                role="button"
                onClick={() => {
                  setNavType("search");
                  setIsOpen(true);
                }}
              >
                <i className={`bi bi-search nav-icon ${iconColorClass}`}></i>
              </div>
            </div>

            {/* 漢堡選單 */}
            <button
              className="navbar-toggler rounded-circle bg-white p-5  border-0  shadow-none wh-56"
              type="button"
              onClick={() => {
                setNavType("menu");
                setIsOpen(true);
              }}
            >
              <div className="hamburger-icon ">
                <span className="line"></span>
                <span className="line middle"></span>
                <span className="line"></span>
              </div>
            </button>
          </div>

          <Offcanvas
            isOpen={isOpen}
            close={() => setIsOpen(false)}
            type={navType}
            setPage={setPage}
          />
        </div>
      </nav>

      {/* 電腦版導覽列 */}
      <div className="fixed-top ">
        <div
          className="p-0 d-none d-lg-flex container justify-content-between"
          style={{ pointerEvents: "auto" }} // 讓選單內的按鈕可以被點擊
        >
          {/* LOGO */}
          <div>
            <NavLink
              to="/"
              className={`logo-box ${shrink ? "logo-box-bg" : ""}`}
            >
              <img
                src={
                  shrink
                    ? "images/logo/logo v2.svg"
                    : "images/logo/logo v2_white.svg"
                }
                alt="logo"
                className={`logo-lg-img ${shrink ? "logo-small" : ""}`}
              />
            </NavLink>
          </div>
          {/* 導覽列 */}
          <div className="flex-shrink-0 bg-primary-90 h-100 ps-12 py-25 rounded-start-bottom right-box">
            <div className="d-flex justify-content-between">
              {/* 選項 */}
              <ul className="d-flex mb-2 mb-lg-0">
                <li className="p-5 me-3">
                  <NavLink
                    className="text-white fs-6 lh-sm fw-medium"
                    to="/products"
                  >
                    商品系列
                  </NavLink>
                </li>
                <li className="p-5 me-3">
                  <NavLink to="/" className="text-white fs-6 lh-sm fw-medium">
                    風格嚴選
                  </NavLink>
                </li>
                <li className="p-5 me-3">
                  <NavLink
                    className="text-white fs-6 lh-sm fw-medium"
                    to="/TradeGuide"
                  >
                    關於收購
                  </NavLink>
                </li>
                <li className="p-5 me-3">
                  <NavLink to="/" className="text-white fs-6 lh-sm fw-medium">
                    品牌故事
                  </NavLink>
                </li>
                <li className="p-5">
                  <NavLink to="/" className="text-white fs-6 lh-sm fw-medium">
                    聯絡我們
                  </NavLink>
                </li>
              </ul>
              {/* 購物車 icon */}
              <div className="d-flex">
                <div className="icon-wrapper p-5">
                  <div
                    className="bg-transparent border-0 shadow-none p-0"
                    role="button"
                  >
                    <i className="bi bi-search text-white nav-icon"></i>
                  </div>
                </div>
                <div className="icon-wrapper p-5">
                  <div
                    className="bg-transparent border-0 shadow-none p-0"
                    role="button"
                  >
                    <i className="bi bi-person text-white nav-icon"></i>
                  </div>
                </div>
                <div className="icon-wrapper p-5">
                  <div
                    className="bg-transparent border-0 shadow-none p-0 position-relative"
                    role="button"
                  >
                    <i className="bi bi-cart text-white nav-icon"></i>
                    {cartCount > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "10px" }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
