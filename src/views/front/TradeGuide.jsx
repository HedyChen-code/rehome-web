import React, { useState } from 'react';
// import axios from 'axios';
import { tradeApi } from '../../api/tradeApi';
// const API_BASE = import.meta.env.VITE_API_BASE;
// const API_PATH = import.meta.env.VITE_API_PATH;


const TradeGuide = () => {
  // 1. 定義表單狀態
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    category: '',
    condition: '',
    width: '',
    depth: '',
    height: '',
    image: '' 
  });

  // 2. 處理欄位變更
  const handleChange = (e) => {
    const { id, value, name } = e.target;
    const fieldName = id || name; 
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // 3. 處理圖片上傳 (轉為 base64 上傳)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const base64Image = await tradeApi.uploadImage(file);
      
      setFormData(prev => ({ 
        ...prev, 
        image: base64Image // 將轉換後的長字串存入表單
      }));
    } catch (error) {
      console.error('圖片處理失敗:', error);
      alert('圖片讀取失敗，請重試');
    }
}

  // 4. 送出表單
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await tradeApi.createTrade(formData);
    alert('家具收購申請送出成功！');
      // 清空表單
      setFormData({
        name: '', phone: '', address: '', category: '', 
        condition: '', width: '', depth: '', height: '', image: ''
      });
    } catch (error) {
      console.error('送出失敗:', error);
      alert('送出失敗，請檢查 json-server 是否啟動');
    }
  };

  return (<>
    <section className=" my-16"></section>
    
    <section className="guide_sm_bg">
        <div className="container">
            <div className="guide_bg d-block">
                <p className="text-white mb-8 fs-lg-2 fs-5">每件物品，都值得再被生活一次</p>
                <p className="text-grey mb-8 fs-lg-5 fs-8">讓舊物不老，<br /> 讓故事延續，<br />  讓物回家， <br /> 讓生活更溫柔。</p>
                <p className="text-primary-70 fs-lg-5 fs-7">物拾 Re:home <br /> 拾起物的故事，延續家的風景。</p>
            </div>
        </div>
    </section>
    {/* <!-- 二手家具媒合流程 --> */}
    <section className="container my-lg-16 my-12 position-relative process-sm-bg">
        <img src="./public/images/logo/graphic-07_light.png" className="align-items-center position-absolute guide-logo z-n1"/>
        <p className="fs-lg-2 fs-4 text-center mb-lg-4 mb-0">二手家具媒合流程</p>
        <p className="fs-lg-5 text-center text-gray-50 mb-12">讓物回家，讓生活更溫柔。</p>
        <div className="process-bg d-block">
            <div className="d-lg-flex d-block align-items-center justify-content-between mb-9 mb-lg-0">
                <div className="position-relative mb-3 mb-lg-0">
                    <span className="fs-lg-6 fs-7 text-white bg-primary-70 px-5 py-2 rounded-pill">事前準備</span>
                    <p className="fs-lg-3 fs-4 mt-4 mb-lg-8 mb-3 text-primary-70">為下一段生活，整理一下</p>
                    <p className="text-grey  fs-lg-5  fs-7">在物件啟程前，邀請你為它做一點溫柔的準備。 <br />簡單清潔、拍下清楚的照片，或寫下它陪伴你的故事與使用狀態。 <br />這些細節，會成為下一位生活主人理解它的第一扇門。</p>
                    <p  className="text-secondary-10  text-deco-1">01</p>
                </div>
                <img src="./public/images/decorate/process-01.png" alt="" className="guide_img_deco"/>
            </div>
            <div className="d-lg-flex d-block align-items-center justify-content-between mb-9 mb-lg-0">
                <img src="./public/images/decorate/process-02.png" alt="" className="guide_img_deco d-lg-block d-none"/>
                <div className="position-relative  mb-3 mb-lg-0">
                    <span className="fs-lg-6 fs-7 text-white bg-primary-70 px-5 py-2 rounded-pill">媒合說明</span>
                    <p className="fs-lg-3 fs-4 mt-4 mb-lg-8 mb-3 text-primary-70">我們在意每件物的去向</p>
                    <p className="text-grey fs-lg-5  fs-7">聯繫 物拾 Re:home 後，我們會向你清楚說明平台的媒合原則： <br />包含適合上架的家具類型、風格分類方式，以及價格建議邏輯。 <br />所有流程透明清楚，沒有壓力，也沒有被低估的擔心。</p>
                    <p  className="text-secondary-10  text-deco-2">02</p>
                </div>
                <img src="./public/images/decorate/process-02.png" alt="" className="guide_img_deco d-lg-none d-block"/>
                
            </div>
            <div className="d-lg-flex d-block align-items-center justify-content-between mb-9 mb-lg-0">
                <div className="position-relative  mb-3 mb-lg-0">
                    <span className="fs-lg-6 fs-7 text-white bg-primary-70 px-5 py-2 rounded-pill">價值評估</span>
                    <p className="fs-lg-3 fs-4 mt-4 mb-lg-8 mb-3 text-primary-70">歲月不是折舊，而是故事</p>
                    <p className="text-grey fs-lg-5  fs-7">我們會仔細看看這件家具的狀態與背景， <br />從使用年限、保存狀況、設計風格、材質細節， <br />到它是否仍能融入下一個家的風景， <br />給出一個尊重物件本身、也對你誠實的建議價值。</p>
                    <p  className="text-secondary-10  text-deco-1">03</p>
                </div>
                <img src="./public/images/decorate/process-03.png" alt="" className="guide_img_deco"/>
            </div>
            <div className="d-lg-flex d-block align-items-center justify-content-between mb-9 mb-lg-0">
                <img src="./public/images/decorate/process-04.png" alt="" className="guide_img_deco  d-lg-block d-none"/>
                <div className="position-relative  mb-3 mb-lg-0">
                    <span className="fs-lg-6 fs-7 text-white bg-primary-70 px-5 py-2 rounded-pill">交接安排</span>
                    <p className="fs-lg-3 fs-4 mt-4 mb-lg-8 mb-3 text-primary-70">把搬運的重量，交給我們</p>
                    <p className="text-grey fs-lg-5  fs-7">當你認同媒合方式與價格後， <br />我們將協助安排交接與取件， <br />讓家具平安地離開，也讓你輕鬆地為生活留出新的空間。</p>
                    <p  className="text-secondary-10  text-deco-2">04</p>
                </div>
                <img src="./public/images/decorate/process-04.png" alt="" className="guide_img_deco d-lg-none d-block"/>
            </div> 


        </div>
                       
    </section >
    {/* <!-- 收購 / 媒合常見 FAQ --> */}
    <section className="bg-primary-90 rounded-3 ">
        <div className="container py-16" >
            <div className="position-relative d-flex justify-content-center align-items-center mb-10">            
                <p className="fs-lg-2  fs-4 text-center mb-10 text-white  z-1">收購 / 媒合常見 FAQ</p>
                <img src="./public/images/logo/graphic-07_dark.png" className="guide-logo opacity-50"/>
            </div>
            <div className="d-lg-flex d-block  align-items-center justify-content-center justify-content-lg-between">
                <div className="accordion w-100 me-8" id="accordionExample">
                    <div className="accordion-item mb-8 border-0 bg-transparent">
                        <h2 className="accordion-header " id="headingOne">
                        <button className="accordion-button collapsed rounded-pill bg-white mb-4 text-dark fs-6 " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                           Q1｜什麼樣的家具適合交給物拾 Re:home？
                        </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body bg-primary-10 rounded-4 mb-4">
                            <p className="fs-7">我們主要媒合仍具使用價值、結構完整、外觀保存良好的家具。特別歡迎具有風格特色、材質溫潤（如木質、設計款）的物件。即使有歲月痕跡，只要安全、可使用，都是我們願意為它尋找新家的對象。</p>
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item mb-8 border-0 bg-transparent">
                        <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed rounded-pill bg-white mb-4 text-dark fs-6 " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                           Q2｜家具一定要全新或很新嗎？
                        </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body bg-primary-10 rounded-4 mb-4">
                            <p className="fs-7">不需要。物拾 Re:home 相信:使用痕跡不是缺點，而是生活留下的證明。我們更在意的是結構安全、使用狀態，以及是否能融入下一段生活風景</p>
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item mb-8 border-0 bg-transparent">
                        <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed rounded-pill bg-white mb-4 text-dark fs-6 " type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                           Q3｜二手家電有收購 / 媒合的年份限制嗎？
                        </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body bg-primary-10 rounded-4 mb-4">
                            <p className="fs-7">有的。由於多數二手家電在超過10年後，可能面臨零件停產、維修困難的情況，特別是變頻類家電，若需要更換主機板或核心零件，往往成本較高，也影響後續使用體驗，因此，
                                為了確保下一位使用者的安全與安心，我們會視年份、品牌與實際狀況評估是否適合媒合上架</p>
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item mb-8 border-0 bg-transparent">
                        <h2 className="accordion-header" id="headingFour">
                        <button className="accordion-button collapsed rounded-pill bg-white mb-4 text-dark fs-6 " type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                           Q4｜物拾 Re:home 的服務範圍在哪裡？
                        </button>
                        </h2>
                        <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                        <div className="accordion-body bg-primary-10 rounded-4 mb-4">
                            <p className="fs-7">目前我們的服務範圍包含：台北市、新北市、桃園地區。若你在其他地區，也歡迎與我們聯絡，我們會盡力協助您評估可能媒合的方式。</p>
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item mb-8 border-0 bg-transparent">
                        <h2 className="accordion-header" id="headingFive">
                        <button className="accordion-button collapsed rounded-pill bg-white mb-4 text-dark fs-6 " type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                          Q5｜為什麼選擇物拾 Re:home，而不是單純賣掉？
                        </button>
                        </h2>
                        <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                        <div className="accordion-body bg-primary-10 rounded-4 mb-4">
                            <p className="fs-7">因為在這裡，你不是把家具「處理掉」，而是替它找一個懂得珍惜的新家。我們不只看價格，也在意物件的去向、風格與故事是否被好好承接。</p>
                        </div>
                        </div>
                    </div>                                                                                      
                </div>
                <img src="./public/images/decorate/process-05.png" alt="" className="QA_deco"/>
            </div>




        </div>
    </section>
    {/* <!-- 商品類別對應購買與配送服務--> */}
    <section className="bg-catgory">
        <div className="container py-16">
            <p className="fs-lg-3 text-black text-center mb-4">商品類別對應購買與配送服務</p>
            <p className="text-primary-50 text-center mb-10 fs-8">在物拾，我們相信—— <br />一張椅子，不只是椅子；一盞燈，不只照亮房間，也照亮過某段時光。</p>
            <div className="table-responsive">
                <table className="table table-borderless align-middle text-center table-separate fs-lg-6 fs-7">
                <thead>
                    <tr>
                        <th scope="col" className="p-0"><div className="p-3 rounded-3 bg-primary-70 text-white fw-normal">家具分類</div></th>
                        <th scope="col" className="p-0"><div className="p-3 rounded-3 bg-primary-70 text-white fw-normal">門市自取</div></th>
                        <th scope="col" className="p-0"><div className="p-3 rounded-3 bg-primary-70 text-white fw-normal">送貨到家</div></th>
                        <th scope="col" className="p-0"><div className="p-3 rounded-3 bg-primary-70 text-white fw-normal">宅配（國內・小型）</div></th>
                        <th scope="col" className="p-0"><div className="p-3 rounded-3 bg-primary-70 text-white fw-normal">宅配（海外・小型）</div></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row" className="p-0"><div className="p-3 rounded-3 bg-primary-10 text-primary-50 fw-normal">沙發 / 座椅類</div></th>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✔</div></td>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✔</div></td>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✘</div></td>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✘</div></td>
                    </tr>
                    <tr>
                    <th scope="row" className="p-0"><div className="p-3 rounded-3 bg-primary-10 text-primary-50 fw-normal">儲物 / 櫃體類</div></th>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✔</div></td>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✔</div></td>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✘</div></td>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✘</div></td>
                    </tr>
                    <tr>
                    <th scope="row" className="p-0"><div className="p-3 rounded-3 bg-primary-10 text-primary-50 fw-normal">床具 / 寢臥類</div></th>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✔</div></td>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✔</div></td>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✔</div></td>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✔</div></td>            
                    </tr>
                    <tr>
                    <th scope="row" className="p-0"><div className="p-3 rounded-3 bg-primary-10 text-primary-50 fw-normal">桌類 / 檯面類</div></th>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✔</div></td>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✔</div></td> 
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✔</div></td>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✔</div></td>                      
                    </tr>
                    <tr>
                    <th scope="row" className="p-0"><div className="p-3 rounded-3 bg-primary-10 text-primary-50 fw-normal">擺飾 / 家飾類</div></th>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✔</div></td>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✘</div></td>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✔</div></td>
                    <td className="p-0"><div className="p-3 rounded-3 bg-white">✔</div></td>                        
                    </tr>                        
                </tbody>
                </table>
            </div>        
        </div>

    </section>
    {/* <!-- 售物意向表單 --> */}
    <section className="bg-sell-img">
        <div className="container">
            <div className="row d-lg-flex d-block align-items-center justify-content-between py-lg-16 py-12 px-4 px-lg-0">
                <div className="col-12 col-lg-7 sell-form-card px-lg-9 px-8 py-lg-10 py-9">
                    <p className="fs-lg-3  fs-4 pb-lg-9 pb-8 text-center text-lg-start">售物意向表單</p>
                      <form className="row" onSubmit={handleSubmit}>
                        {/* 姓名 */}
                        <div className="col-lg-6 col-12 mb-8">
                          <label htmlFor="name" className="form-label fs-6 mb-3">姓名</label>
                          <input 
                            type="text" 
                            className="form-control sell-form-col" 
                            id="name" 
                            placeholder="請輸入你的姓名"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        {/* 聯絡電話 */}
                        <div className="col-lg-6 col-12 mb-8">
                          <label htmlFor="phone" className="form-label fs-6 mb-3">聯絡電話</label>
                          <input 
                            type="text" 
                            className="form-control sell-form-col" 
                            id="phone" 
                            placeholder="請輸入聯絡電話"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        {/* 取件地址 */}
                        <div className="col-12 mb-8">
                          <label htmlFor="address" className="form-label fs-6 mb-3">取件地址</label>
                          <input 
                            type="text" 
                            className="form-control sell-form-col" 
                            id="address" 
                            placeholder="請輸入取件地址"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        {/* 家具類別 */}
                        <div className="col-lg-6 col-12 mb-8">
                          <label className="form-label fs-6 mb-3">家具類別</label>
                          <select 
                            className="form-select sell-form-col" 
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                          >
                            <option value="">請選擇家具類型</option>
                            <option value="沙發/座椅類">沙發 / 座椅類</option>
                            <option value="儲物/櫃體類">儲物 / 櫃體類</option>
                            <option value="床具/寢臥類">床具 / 寢臥類</option>
                            <option value="桌類/檯面類">桌類 / 檯面類</option>
                            <option value="擺飾/家飾類">擺飾 / 家飾類</option>
                          </select>
                        </div>

                        {/* 狀況自評 */}
                        <div className="col-lg-6 mb-8">
                          <label className="form-label fs-lg-6 mb-3">狀況自評</label>
                          <select 
                            className="form-select sell-form-col" 
                            name="condition"
                            value={formData.condition}
                            onChange={handleChange}
                            required
                          >
                            <option value="">請選擇物件狀況</option>
                            <option value="全新">全新</option>
                            <option value="良好">良好</option>
                            <option value="一般">一般</option>
                            <option value="較差">較差</option>
                            <option value="破損">破損</option>
                          </select>
                        </div>

                        {/* 尺寸 */}
                        <div className="mb-8">
                          <p className="mb-3">尺寸</p>
                          <div className="d-lg-flex d-block align-items-center flex-wrap">
                            <div className="d-flex align-items-center">
                              <label htmlFor="width" className="size-label fs-lg-6">寬</label>
                              <input type="number" className="size-input ps-4 sell-form-col" id="width" value={formData.width} placeholder="ex:100" onChange={handleChange}/>
                              <span className="ms-3">cm</span>
                            </div>
                            <div className="col-auto px-lg-5 px-0">x</div>
                            <div className="d-flex align-items-center">
                              <label htmlFor="depth" className="size-label fs-lg-6">深</label>
                              <input type="number" className="size-input ps-4 sell-form-col" id="depth" value={formData.depth} placeholder="ex:100" onChange={handleChange}/>
                              <span className="ms-3">cm</span>
                            </div>
                            <div className="col-auto px-lg-5 px-0">x</div>
                            <div className="d-flex align-items-center">
                              <label htmlFor="height" className="size-label fs-lg-6">高</label>
                              <input type="number" className="size-input ps-4 sell-form-col" id="height" value={formData.height} placeholder="ex:100" onChange={handleChange}/>
                              <span className="ms-3">cm</span>
                            </div>
                          </div>
                        </div>

                        {/* 照片上傳 */}
                        <div className="mb-9 mt-8">
                          <label className="form-label fs-lg-6 mb-3">照片上傳</label>
                          <label htmlFor="formFile" className="upload-box d-flex flex-column align-items-center justify-content-center" style={{ border: '1px dashed #ccc', cursor: 'pointer', padding: '20px' }}>
                            <i className="bi bi-upload mb-2"></i>
                            <span>{formData.image ? "已選擇照片" : "點擊上傳照片"}</span>
                            <input className="form-control" type="file" id="formFile" hidden onChange={handleImageUpload} accept="image/*" />
                          </label>
                        </div>


                        {/* 送出按鈕 */}
                        <div className="col-12">
                          <button type="submit" className="btn btn-primary rounded-pill px-8 py-4">
                            送出表單
                          </button>
                        </div>
                      </form>
                </div>
                <div className="col-12 col-lg-5 align-items-center my-8">
                    <div className="ms-4">
                        <p className="fs-lg-4 fs-5 text-gray-90 mb-9">把想告別的家具，交給物拾就好。</p>
                        <p className="fs-lg-5 fs-7 text-gray-90 mb-9">填寫完表單後，<br />我們會在 3–4 個工作日內回覆收購評估與取件方式。</p>
                        <p className="fs-lg-5 fs-7 text-gray-90 mb-9">✔ 流程透明<br />✔ 價格公道</p>
                        <p className="fs-lg-5 fs-7 text-gray-90 mb-9">讓物件安心去下一個家</p>
                    </div>
                </div>
                    
            </div>
        </div>
        

    </section>


    </>
  );
}
export default TradeGuide;