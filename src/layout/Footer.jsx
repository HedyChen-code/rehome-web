function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="container p-0">
        {/* g-0 移除間隙，align-items-start 底部對齊 */}
        <div className="row g-0 align-items-end">
          {/* 左側深色區塊 (8份) */}
          <div className="col-lg-8">
            <div className="footer-box-dark py-12 text-white">
              <div>
                {/* 第一行：LOGO + 右側區塊 */}
                <div className="d-flex flex-column flex-md-row align-items-center mb-3">
                  {/* 左邊：LOGO */}
                  <div className="me-10 mb-10 mb-md-0">
                    <img
                      src="images/logo/logo v2_white.svg"
                      alt="Re:home"
                      className="footer-logo"
                    />
                  </div>

                  {/* 右邊整個區塊（333 + 444） */}
                  <div>
                    {/* 333 區塊：10 個超連結 */}
                    <div className="links text-center text-md-start mb-8">
                      <a href="#" className="footer-link">
                        品牌故事
                      </a>
                      <a href="#" className="footer-link">
                        付款流程
                      </a>
                      <a href="#" className="footer-link">
                        退換貨流程
                      </a>
                      <a href="#" className="footer-link">
                        會員權益
                      </a>
                      <a href="#" className="footer-link">
                        FAQ
                      </a>
                      <a href="#" className="footer-link">
                        人才招募
                      </a>
                      <a href="#" className="footer-link">
                        運送說明
                      </a>
                      <a href="#" className="footer-link">
                        會員中心
                      </a>
                      <a href="#" className="footer-link">
                        聯絡我們
                      </a>
                      <a href="#" className="footer-link">
                        隱私權政策
                      </a>
                    </div>

                    {/* 444 區塊：社群 icon */}
                    <div className="text-center text-md-start mb-8">
                      <a
                        href="#"
                        className="icon-pr me-4"
                        aria-label="Instagram"
                      >
                        <img src="images/icon/ig.svg" alt="Instagram" />
                      </a>

                      <a
                        href="#"
                        className="icon-pr me-4"
                        aria-label="Facebook"
                      >
                        <img src="images/icon/fb.svg" alt="Facebook" />
                      </a>

                      <a href="#" className="icon-pr me-4" aria-label="Youtube">
                        <img src="images/icon/yt.svg" alt="Youtube" />
                      </a>

                      <a href="#" className="icon-pr me-4" aria-label="X">
                        <img src="images/icon/X.svg" alt="X" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* 第二行：copy */}
                <div className="footer-bottom text-center text-md-start">
                  © 2025 物拾 Re: home. All Rights Reserved.
                </div>

                <div
                  className="bg-primary90 d-block d-md-none"
                  style={{ height: '168px' }}
                />
              </div>
            </div>
          </div>

          {/* 右側淺色訂閱區 (4份) */}
          <div className="col-lg-4 overlap-col">
            <div className="footer-box-light py-12 px-12 px-md-16">
              <h5 className="h6 mb-4">物拾 Re:home 電子報</h5>

              {/* email 輸入框與立即訂閱按鈕 */}
              <div className="newsletter-form">
                <input
                  type="email"
                  className="form-control"
                  placeholder="請輸入E-mail信箱"
                  aria-label="Email"
                />
                <button className="btn-pr" type="button">
                  立即訂閱
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
