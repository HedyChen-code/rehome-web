import { Link } from 'react-router';

function Footer() {
  return (
    <footer className="overflow-hidden p-0">
      <div className="container-lg p-0">
        <div className="row m-0 position-relative">
          {/* 左側深色區塊 (8份) */}
          <div className="ps-0 col-lg-8 footer-left-box">
            <div className="pt-12 pb-10 pb-xl-12 px-xl-16 text-white bg-primary-90 rounded-top-end">
              <div className="d-flex flex-column flex-xl-row align-items-center mb-xl-9">
                {/* 左邊：LOGO */}
                <div className="mb-10 mb-xl-0 me-xl-10">
                  <Link to="/">
                    <img
                      src="images/logo/logo v2_white.svg"
                      alt="Re:home"
                      className="footer-logo"
                    />
                  </Link>
                </div>

                {/* 右邊整個區塊（連結 + 社群） */}
                <div>
                  {/* 333 區塊：連結 */}
                  <div className="d-flex justify-content-around mb-8 flex-xl-column">
                    <ul className="me-10 me-xl-0 text-center d-xl-flex list-unstyled">
                      <li className="mb-7 mb-xl-5 me-xl-8">
                        <a href="#" className="text-white font-noto">
                          品牌故事
                        </a>
                      </li>
                      <li className="mb-7 mb-xl-5 me-xl-8">
                        <a href="#" className="text-white font-noto">
                          付款流程
                        </a>
                      </li>
                      <li className="mb-7 mb-xl-5 me-xl-8">
                        <a href="#" className="text-white font-noto">
                          退換貨流程
                        </a>
                      </li>
                      <li className="mb-7 mb-xl-5 me-xl-8">
                        <a href="#" className="text-white font-noto">
                          會員權益
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex-grow-1 text-white font-noto"
                        >
                          FAQ
                        </a>
                      </li>
                    </ul>
                    <ul className="text-center d-xl-flex list-unstyled">
                      <li className="mb-7 mb-xl-5 me-xl-8">
                        <a href="#" className="text-white font-noto">
                          人才招募
                        </a>
                      </li>
                      <li className="mb-7 mb-xl-5 me-xl-8">
                        <a href="#" className="text-white font-noto">
                          運送說明
                        </a>
                      </li>
                      <li className="mb-7 mb-xl-5 me-xl-8">
                        <a href="#" className="text-white font-noto">
                          會員中心
                        </a>
                      </li>
                      <li className="mb-7 mb-xl-5 me-xl-8">
                        <a href="#" className="text-white font-noto">
                          聯絡我們
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-white font-noto">
                          隱私權政策
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* 444 區塊：社群 icon */}
                  <div className="text-center text-xl-start mb-8 mb-xl-0">
                    <a href="#" className="icon-pr me-5" aria-label="Instagram">
                      <img src="images/icon/ig.svg" alt="Instagram" />
                    </a>
                    <a href="#" className="icon-pr me-5" aria-label="Facebook">
                      <img src="images/icon/fb.svg" alt="Facebook" />
                    </a>
                    <a href="#" className="icon-pr me-5" aria-label="Youtube">
                      <img src="images/icon/yt.svg" alt="Youtube" />
                    </a>
                    <a href="#" className="icon-pr" aria-label="X">
                      <img src="images/icon/X.svg" alt="X" />
                    </a>
                  </div>
                </div>
              </div>

              {/* 第二行：copy */}
              <p className="footer-bottom text-center text-xl-start fs-9 font-noto">
                © 2025 物拾 Re: home. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* 右側淺色訂閱區 (4份) */}
          <div className="pe-0 ps-lg-0 col-lg-5 footer-right-box">
            <div className="rounded-top-start bg-primary-10 py-12 px-12 px-xl-16">
              <h5 className="h6 mb-4">物拾 Re:home 電子報</h5>
              <div className="newsletter-form d-flex flex-column flex-xl-row">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="form-control"
                  placeholder="請輸入E-mail信箱"
                  aria-label="Email"
                  style={{ width: '240px' }}
                />
                <div>
                  <button className="btn-pr" type="button">
                    立即訂閱
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
