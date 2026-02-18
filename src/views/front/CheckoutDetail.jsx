const CheckoutDetail = () => {
  const handleAddrModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return (<>
  <div className="bg-light-grey py-12">
    <div className="container mb-9 text-gray-90" style={{ marginTop: '144px' }}>
      <div className="row justify-content-center">
        <div className="col">
          <form action="">
            <section className="checkout-card mb-9 pb-5">
              <h3 className="font-fakepearl fw-normal">
                <i className="bi bi-geo-alt-fill me-5"></i>
                選擇配送方式
              </h3>
              <div className="my-10">
                <div className="form-check mb-8">
                  <div className="d-flex justify-content-between">
                    <div>
                      <input className="form-check-input" type="radio" name="shippingMethod" id="shippingNormal" />
                      <label className="form-check-label h5 mb-2" htmlFor="shippingNormal">
                        一般宅配
                      </label>
                      <p className="fs-7 text-info font-noto mb-4">預計配送時間：3–5 日</p>
                    </div>
                    <div className="div">
                      <h4 className="h4">TWD $500</h4>
                    </div>
                  </div>
                  <div className="vstack gap-3 font-noto">
                    {/* 地址卡 1 */}
                    <div className="position-relative">
                      <input type="radio" className="btn-check" name="normalAddr" id="normal1" autoComplete="off" defaultChecked />
                      <label 
                        className="btn border font-noto label-btn" htmlFor="normal1">
                        <div className="text-start">
                          <p className="text-gray-90 mb-2">
                            陳小明<span className="text-gray-50">+886 444556789</span>
                          </p>
                          <p className="fs-8 text-gray-50">台南縣東平平區小羊路日四段12號</p>
                        </div>
                      </label>
                      <button type="button" className="edit-btn">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23 16H16C15.4696 16 14.9609 16.2107 14.5858 16.5858C14.2107 16.9609 14 17.4696 14 18V32C14 32.5304 14.2107 33.0391 14.5858 33.4142C14.9609 33.7893 15.4696 34 16 34H30C30.5304 34 31.0391 33.7893 31.4142 33.4142C31.7893 33.0391 32 32.5304 32 32V25" stroke="#B8B8C1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M30.5 14.5002C30.8978 14.1024 31.4374 13.8789 32 13.8789C32.5626 13.8789 33.1022 14.1024 33.5 14.5002C33.8978 14.8981 34.1213 15.4376 34.1213 16.0002C34.1213 16.5628 33.8978 17.1024 33.5 17.5002L24 27.0002L20 28.0002L21 24.0002L30.5 14.5002Z" stroke="#B8B8C1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    
                    {/* 地址卡 2 */}
                    <div className="position-relative">
                      <input type="radio" className="btn-check" name="normalAddr" id="normal2" autoComplete="off" />
                      <label 
                        className="btn border font-noto label-btn" htmlFor="normal2">
                        <div className="text-start">
                          <p className="text-gray-90 mb-2">
                            王省省<span className="text-gray-50">+886 912342234</span>
                          </p>
                          <p className="fs-8 text-gray-50">台西縣安安區太陽路二段243號</p>
                        </div>
                      </label>
                      <button type="button" className="edit-btn">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23 16H16C15.4696 16 14.9609 16.2107 14.5858 16.5858C14.2107 16.9609 14 17.4696 14 18V32C14 32.5304 14.2107 33.0391 14.5858 33.4142C14.9609 33.7893 15.4696 34 16 34H30C30.5304 34 31.0391 33.7893 31.4142 33.4142C31.7893 33.0391 32 32.5304 32 32V25" stroke="#B8B8C1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M30.5 14.5002C30.8978 14.1024 31.4374 13.8789 32 13.8789C32.5626 13.8789 33.1022 14.1024 33.5 14.5002C33.8978 14.8981 34.1213 15.4376 34.1213 16.0002C34.1213 16.5628 33.8978 17.1024 33.5 17.5002L24 27.0002L20 28.0002L21 24.0002L30.5 14.5002Z" stroke="#B8B8C1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    </div>

                    {/* 新增選項 */}
                    <button type="button" className="btn add-option" p>
                      <i className="bi bi-plus-lg me-4"></i>
                      新增其他地址
                    </button>
                  </div>
                </div>
                <div className="form-check mb-8">
                  <div className="d-flex justify-content-between">
                    <div>
                      <input className="form-check-input" type="radio" name="shippingMethod" id="shippingHome" />
                      <label className="form-check-label h5 mb-2" htmlFor="shippingHome">
                        送貨到家
                      </label>
                      <p className="fs-7 text-info mb-4">預計配送時間：3–5 日</p>
                    </div>
                    <div className="div">
                      <h4 className="h4">TWD $1,500</h4>
                    </div>
                  </div>
                  <div className="vstack gap-3 font-noto">
                    <div className="position-relative">
                      <input type="radio" className="btn-check" name="homeAddr" id="home1" autoComplete="off" />
                      <label 
                        className="btn border label-btn" htmlFor="home1">
                        <div className="text-start">
                          <p className="text-gray-90 mb-2">
                            王省省<span className="text-gray-50">+886 912342234</span>
                          </p>
                          <p className="fs-8 text-gray-50">台西縣安安區太陽路二段243號</p>
                        </div>
                      </label>
                      <button type="button" className="edit-btn">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23 16H16C15.4696 16 14.9609 16.2107 14.5858 16.5858C14.2107 16.9609 14 17.4696 14 18V32C14 32.5304 14.2107 33.0391 14.5858 33.4142C14.9609 33.7893 15.4696 34 16 34H30C30.5304 34 31.0391 33.7893 31.4142 33.4142C31.7893 33.0391 32 32.5304 32 32V25" stroke="#B8B8C1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M30.5 14.5002C30.8978 14.1024 31.4374 13.8789 32 13.8789C32.5626 13.8789 33.1022 14.1024 33.5 14.5002C33.8978 14.8981 34.1213 15.4376 34.1213 16.0002C34.1213 16.5628 33.8978 17.1024 33.5 17.5002L24 27.0002L20 28.0002L21 24.0002L30.5 14.5002Z" stroke="#B8B8C1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    <button type="button" className="btn add-option" p>
                      <i className="bi bi-plus-lg me-4"></i>
                      新增其他地址
                    </button>
                  </div> 
                </div>
                <div className="form-check">
                  <div className="d-flex justify-content-between">
                    <div>
                      <input className="form-check-input" type="radio" name="shippingMethod" id="shippingStore" />
                      <label className="form-check-label h5 mb-2" htmlFor="shippingStore">
                        門市自取
                      </label>
                      <p className="fs-7 text-info font-noto mb-4">下單後可於門市上班時間取貨</p>
                    </div>
                    <div className="div">
                      <h4 className="h4">免運費</h4>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="text-center font-noto fs-8 text-gray-50 border-top pt-5">
                物拾 Re:home 承諾：安心購買保障｜專業清潔整新｜永續環保選擇
              </footer>
            </section>
            <section className="checkout-card mb-9">
            <h3 className="d-flex align-items-center">
              <img src="images/icon/user.svg" className="me-4" style={{width: 32, height: 32}} alt="" />
              訂購人資訊
            </h3>
            <div className="row order-data-block">
              <div className="col-md-6">
                <label htmlFor="username" className="form-label h6">
                  訂購人姓名
                  <span className="ms-2 text-danger">*</span>
                </label>
                <input 
                  name="username"
                  id="username"
                  type="text" 
                  placeholder="請輸入訂購人姓名"
                  className="form-control input-gray-20 font-noto"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="tel" className="form-label h6">
                  聯絡電話
                  <span className="ms-2 text-danger">*</span>
                </label>
                <input 
                  name="tel"
                  id="tel"
                  type="tel" 
                  placeholder="請輸入聯絡電話"
                  className="form-control input-gray-20 font-noto"
                />
              </div>
            </div>
            <div className="row order-data-block">
              <div className="col">
                <label htmlFor="username" className="form-label h6">
                  聯絡地址
                  <span className="ms-2 text-danger">*</span>
                </label>
                <input 
                  name="username"
                  id="username"
                  type="text" 
                  placeholder="請輸入聯絡地址"
                  className="form-control input-gray-20 font-noto"
                />
              </div>
            </div>
            <div className="row order-data-block">
              <div className="col">
                <h6 className="mb-0">
                  付款方式
                  <span className="ms-2 text-danger">*</span>
                </h6>
                <div className="py-8 font-noto">
                  <div className="form-check py-4 mb-3">
                    <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault1" />
                    <label className="form-check-label mb-4" htmlFor="radioDefault1">
                      信用卡/金融卡
                    </label>
                    <div className="vstack gap-3">
                    {/* 信用卡/金融卡 1 */}
                      <div className="position-relative">
                        <input type="radio" className="btn-check" name="creditCard" id="credit" autoComplete="off" defaultChecked />
                        <label 
                          className="btn border label-btn" htmlFor="credit">
                          <div className="d-flex justify-content-start align-items-center">
                            <img src="images/icon/visa-brandmark.svg" style={{width: "40"}} alt="visa-icon" />
                            <p className="text-gray-90 ms-4">****1356</p>
                          </div>
                        </label>
                      </div>

                      {/* 新增選項 */}
                      <button type="button" className="btn add-option" p>
                        <i className="bi bi-plus-lg me-4"></i>
                        新增其他信用卡
                      </button>
                    </div>
                  </div>
                  <div className="form-check py-4 mb-3">
                    <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault1" />
                    <label className="form-check-label" htmlFor="radioDefault1">
                      轉帳
                    </label>
                  </div>
                  <div className="form-check py-4">
                    <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault1" />
                    <label className="form-check-label" htmlFor="radioDefault1">
                      貨到付款
                    </label>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="row order-data-block">
              <div className="col">
                <h6 className="mb-0">
                  發票資訊
                  <span className="ms-2 text-danger">*</span>
                </h6>
                <div className="py-8 font-noto">
                  <div className="form-check py-4 mb-3">
                    <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault1" />
                    <label className="form-check-label mb-3" htmlFor="radioDefault1">
                      手機載具
                    </label>
                    <div className="vstack gap-3 font-noto">
                      <input 
                        type="number" 
                        className="form-control input-gray-20"
                        placeholder="請輸入手機載具"
                        aria-label="手機載具"
                      />
                    </div>
                  </div>
                  <div className="form-check py-4 mb-3">
                    <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault1" />
                    <label className="form-check-label" htmlFor="radioDefault1">
                      公司發票
                    </label>
                  </div>
                  <div className="form-check py-4">
                    <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault1" />
                    <label className="form-check-label" htmlFor="radioDefault1">
                      捐贈發票
                    </label>
                  </div>
                </div>
                
              </div>
            </div>
          </section>
          </form>
        </div>
      </div>
    </div>
    <div className="text-center">
      <button type="button" className="btn btn-pr">送出訂單</button>
    </div>
    
  </div>
  </>)
}

export default CheckoutDetail
