function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="container p-0">
        {/* g-0 移除間隙，align-items-start 底部對齊 */}
        <div className="row g-0 align-items-end">
          {/* 左側深色區塊 (8份) */}
          <div className="col-lg-8">
            <div className="footer-box-dark py-md-12 text-white">
              <div className="row align-items-start">
                {/* Logo */}
                <div className="col-md-3 mb-4 mb-md-0 text-center text-md-end">
                  <img
                    src="/src/assets/images/logo/logo v2_white.svg"
                    alt="Re:home"
                    className="footer-logo"
                  />
                </div>

                {/* 導覽連結 */}
                <div className="col-md-9">
                  <div className="row row-cols-2 row-cols-md-5 g-3 mb-12 text-center text-md-center">
                    <div className="col">
                      <a href="#" className="footer-link">品牌故事</a>
                    </div>
                    <div className="col">
                      <a href="#" className="footer-link">付款流程</a>
                    </div>
                    <div className="col">
                      <a href="#" className="footer-link">退換貨流程</a>
                    </div>
                    <div className="col">
                      <a href="#" className="footer-link">會員權益</a>
                    </div>
                    <div className="col">
                      <a href="#" className="footer-link">FAQ</a>
                    </div>
                    <div className="col">
                      <a href="#" className="footer-link">人才招募</a>
                    </div>
                    <div className="col">
                      <a href="#" className="footer-link">運送說明</a>
                    </div>
                    <div className="col">
                      <a href="#" className="footer-link">會員中心</a>
                    </div>
                    <div className="col">
                      <a href="#" className="footer-link">聯絡我們</a>
                    </div>
                    <div className="col">
                      <a href="#" className="footer-link">隱私權政策</a>
                    </div>
                  </div>

                  {/* 社群圖示 */}
                  <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-4">
                    <a href="#" className="icon-pr" aria-label="Instagram">
                      <img src="/src/assets/images/icon/ig.svg" alt="Instagram" />
                    </a>
                    <a href="#" className="icon-pr" aria-label="Facebook">
                      <img src="/src/assets/images/icon/fb.svg" alt="Facebook" />
                    </a>
                    <a href="#" className="icon-pr" aria-label="Youtube">
                      <img src="/src/assets/images/icon/yt.svg" alt="Youtube" />
                    </a>
                    <a href="#" className="icon-pr" aria-label="X">
                      <img src="/src/assets/images/icon/X.svg" alt="X" />
                    </a>
                  </div>
                </div>
              </div>

              {/* 版權宣告 */}
              <div className="mt-5 pt-3 text-center text-md-center border-top border-white border-opacity-10">
                <small className="opacity-75">
                  © 2025 物拾 Re: home. All Rights Reserved.
                </small>
              </div>
            </div>
          </div>

          {/* 右側淺色訂閱區 (4份) */}
          <div className="col-lg-4 overlap-col">
            <div className="footer-box-light p-4 p-md-5">
              <h5 className="newsletter-title mb-4">
                物拾 Re:home 電子報
              </h5>

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
