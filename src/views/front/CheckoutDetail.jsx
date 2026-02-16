const CheckoutDetail = () => {
  return (<>
    <div className="bg-light-grey py-12">
      <div className="container mb-9 text-gray-90" style={{ marginTop: '144px' }}>
        <div className="row justify-content-center">
          <div className="col">
            <form action="">
              <section className="checkout-card mb-9">
                <h3 className="font-fakepearl fw-normal">
                  <i class="bi bi-geo-alt-fill me-5"></i>
                  選擇配送方式
                </h3>
                <div className="my-10">
                  <div className="form-check mb-8">
                    <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault1" />
                    <label className="form-check-label h5 mb-2" htmlFor="radioDefault1">
                      一般宅配
                    </label>
                    <p className="fs-7 text-info font-noto mb-4">預計配送時間：3–5 日</p>
                  </div>
                  <div className="form-check mb-8">
                    <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault2" />
                    <label className="form-check-label h5" htmlFor="radioDefault2">
                      送貨到家
                    </label>
                    <p className="fs-7 text-info font-noto mb-4">預計配送時間：3–5 日</p>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault2" />
                    <label className="form-check-label h5" htmlFor="radioDefault2">
                      門市自取
                    </label>
                    <p className="fs-7 text-info font-noto mb-4">下單後可於門市上班時間取貨</p>
                  </div>
                </div>
                <footer className="text-center font-noto fs-8 text-gray-50 border-top pt-5">
                  物拾 Re:home 承諾：安心購買保障｜專業清潔整新｜永續環保選擇
                </footer>
              </section>
              <section className="checkout-card mb-9">
              <h3>
                訂購人資訊
              </h3>
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