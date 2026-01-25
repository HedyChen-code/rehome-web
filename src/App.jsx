import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Footer from './layout/Footer';
import Navbar from './layout/Navbar'
// import { Modal } from 'bootstrap' 使用JS控制Bootstrap元件再打開

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    (async () => {
      const res = await axios.get('https://randomuser.me/api/')
      console.log(res)
    })()
  }, [])
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

              <a href="#" className="btn btn-outline-primary"> 我想找收購 </a>
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
            <div
              className="col-12 col-md-6 text-center text-md-start order-md-1 position-relative"
            >
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

              <a href="#" className="btn btn-outline-primary"> 我想買家具 </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>

  )
}

export default App
