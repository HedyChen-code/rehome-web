import axios from "axios";
import { useEffect, useRef, useState } from "react";
import * as bootstrap from 'bootstrap';
import { formateNumber } from "../../utils/filter";
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const CheckoutDetail = () => {
  const [ submitModal, setSubmitModal ] = useState({});

  // const [form, setForm] = useState({
  //   shippingMethod: "shippingNormal",      // shippingNormal / shippingHome / shippingStore
  //   addressId: "addr_1",
  //   receiver: { name: "", tel: "", address: "" },
  //   payment: "card",             // card / transfer / cod
  //   invoiceType: "mobile",       // mobile / company / donate
  //   invoiceValue: "",            // 手機載具 / 統編 / 捐贈碼
  // });
  
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm(
    { mode: "onChange" }
  );

  const invoiceType = watch('invoiceType'); // mobile / company /donate

  const onSubmit = async (formData) => {
    console.log('表單資料：', formData);
    try {
      const url = `${API_BASE}/api/${API_PATH}/order`;
      const data = {
        data: {
          user: formData,
          message: formData.message
        }
      }
      const res = await axios.post(url, data);
      setSubmitModal({
        type: 'success', title: '已成功送出！', message: '感謝您的訂購！我們已收到您的資料。'
      })
      openOrderSubmitModal();
    } catch (error) {
      setSubmitModal({
        type: 'error', title: '送出失敗', message: '系統暫時無法處理您的請求，請稍後再試。'
      })
      openOrderSubmitModal();
    }
  }


  const addressModalRef = useRef(null);
  const openAddressModal = () => {
    addressModalRef.current.show();
  }

  const orderSubmitModalRef = useRef(null);
  const openOrderSubmitModal = () => {
    orderSubmitModalRef.current.show();
  }

  useEffect(() => {
    addressModalRef.current = new bootstrap.Modal('#addressModal');
    orderSubmitModalRef.current = new bootstrap.Modal('#orderSubmitModal');
    
  }, [])

  return (<>
  <div className="bg-light-grey py-8 py-md-12">
    <div className="container text-gray-95" style={{ marginTop: '144px' }}>
      <div className="row justify-content-center">
        <div className="col">
          <form onSubmit={ handleSubmit(onSubmit) }>
            <section className="checkout-card mb-8 mb-md-9 pb-5">
              <h3 className="font-fakepearl fw-normal fs-4 fs-md-3">
                <i className="bi bi-geo-alt-fill me-5"></i>
                選擇配送方式
              </h3>
              <div className="my-8 my-md-10">
                <div className="form-check mb-8">
                  <div className="d-flex justify-content-between">
                    <div>
                      <input 
                        className={`form-check-input ${ errors.shippingMethod && 'is-invalid'}`}
                        type="radio" 
                        name="shippingMethod" 
                        id="shippingNormal"
                        value="shippingNormal"
                        {...register('shippingMethod', { required: '請選擇配送方式'})}
                      />
                      <label 
                        className="form-check-label fs-6 fs-md-5 mb-2"
                        htmlFor="shippingNormal"
                      >
                        一般宅配
                      </label>
                      <p className="fs-9 fs-md-7 text-info font-noto mb-4">預計配送時間：3–5 日</p>

                      { errors.shippingMethod && <div className="invalid-feedback">{ errors?.shippingMethod?.message }</div>}

                    </div>
                    <div className="div">
                      <h4 className="fs-5 fs-md-4">TWD $500</h4>
                    </div>
                  </div>
                  <div className="vstack gap-3 font-noto">
                    {/* 地址卡 1 */}
                    <div className="position-relative">
                      <input type="radio" className="btn-check" name="normalAddr" id="normal1" autoComplete="off" defaultChecked />
                      <label 
                        className="btn border font-noto label-btn" htmlFor="normal1">
                        <div className="text-start">
                          <p className="text-gray-95 mb-2">
                            陳小明<span className="fs-8 fs-md-7 text-gray-50">+886 444556789</span>
                          </p>
                          <p className="fs-9 fs-md-8 text-gray-50">台南縣東平平區小羊路日四段12號</p>
                        </div>
                      </label>
                      <button type="button" className="edit-btn" onClick={ openAddressModal }>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23 16H16C15.4696 16 14.9609 16.2107 14.5858 16.5858C14.2107 16.9609 14 17.4696 14 18V32C14 32.5304 14.2107 33.0391 14.5858 33.4142C14.9609 33.7893 15.4696 34 16 34H30C30.5304 34 31.0391 33.7893 31.4142 33.4142C31.7893 33.0391 32 32.5304 32 32V25" stroke="#B8B8C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M30.5 14.5002C30.8978 14.1024 31.4374 13.8789 32 13.8789C32.5626 13.8789 33.1022 14.1024 33.5 14.5002C33.8978 14.8981 34.1213 15.4376 34.1213 16.0002C34.1213 16.5628 33.8978 17.1024 33.5 17.5002L24 27.0002L20 28.0002L21 24.0002L30.5 14.5002Z" stroke="#B8B8C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    
                    {/* 地址卡 2 */}
                    <div className="position-relative">
                      <input type="radio" className="btn-check" name="normalAddr" id="normal2" autoComplete="off" />
                      <label 
                        className="btn border font-noto label-btn" htmlFor="normal2">
                        <div className="text-start">
                          <p className="text-gray-95 mb-2">
                            王省省<span className="fs-8 fs-md-7 text-gray-50">+886 912342234</span>
                          </p>
                          <p className="fs-9 fs-md-8 text-gray-50">台西縣安安區太陽路二段243號</p>
                        </div>
                      </label>
                      <button type="button" className="edit-btn">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23 16H16C15.4696 16 14.9609 16.2107 14.5858 16.5858C14.2107 16.9609 14 17.4696 14 18V32C14 32.5304 14.2107 33.0391 14.5858 33.4142C14.9609 33.7893 15.4696 34 16 34H30C30.5304 34 31.0391 33.7893 31.4142 33.4142C31.7893 33.0391 32 32.5304 32 32V25" stroke="#B8B8C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M30.5 14.5002C30.8978 14.1024 31.4374 13.8789 32 13.8789C32.5626 13.8789 33.1022 14.1024 33.5 14.5002C33.8978 14.8981 34.1213 15.4376 34.1213 16.0002C34.1213 16.5628 33.8978 17.1024 33.5 17.5002L24 27.0002L20 28.0002L21 24.0002L30.5 14.5002Z" stroke="#B8B8C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>

                    {/* 新增選項 */}
                    <button type="button" className="btn add-option">
                      <i className="bi bi-plus-lg me-4"></i>
                      新增其他地址
                    </button>
                  </div>
                </div>
                <div className="form-check mb-8">
                  <div className="d-flex justify-content-between">
                    <div>
                      <input 
                        className={`form-check-input ${ errors.shippingMethod && 'is-invalid'}`}
                        type="radio" 
                        name="shippingMethod" 
                        id="shippingHome" 
                        value="shippingHome"
                        {...register('shippingMethod', { required: '請選擇配送方式'})}
                      />
                      <label className="form-check-label fs-6 fs-md-5 mb-2" htmlFor="shippingHome">
                        送貨到家
                      </label>
                      <p className="fs-9 fs-md-7 text-info mb-4">預計配送時間：3–5 日</p>

                      { errors.shippingMethod && <div className="invalid-feedback">{ errors?.shippingMethod?.message }</div>}

                    </div>
                    <div className="div">
                      <h4  className="fs-5 fs-md-4">TWD $1,500</h4>
                    </div>
                  </div>
                  <div className="vstack gap-3 font-noto">
                    <div className="position-relative">
                      <input type="radio" className="btn-check" name="homeAddr" id="home1" autoComplete="off" />
                      <label 
                        className="btn border label-btn" htmlFor="home1">
                        <div className="text-start">
                          <p className="text-gray-95 mb-2">
                            王省省<span className="fs-8 fs-md-7 text-gray-50">+886 912342234</span>
                          </p>
                          <p className="fs-9 fs-md-8 text-gray-50">台西縣安安區太陽路二段243號</p>
                        </div>
                      </label>
                      <button type="button" className="edit-btn">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23 16H16C15.4696 16 14.9609 16.2107 14.5858 16.5858C14.2107 16.9609 14 17.4696 14 18V32C14 32.5304 14.2107 33.0391 14.5858 33.4142C14.9609 33.7893 15.4696 34 16 34H30C30.5304 34 31.0391 33.7893 31.4142 33.4142C31.7893 33.0391 32 32.5304 32 32V25" stroke="#B8B8C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M30.5 14.5002C30.8978 14.1024 31.4374 13.8789 32 13.8789C32.5626 13.8789 33.1022 14.1024 33.5 14.5002C33.8978 14.8981 34.1213 15.4376 34.1213 16.0002C34.1213 16.5628 33.8978 17.1024 33.5 17.5002L24 27.0002L20 28.0002L21 24.0002L30.5 14.5002Z" stroke="#B8B8C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    <button type="button" className="btn add-option">
                      <i className="bi bi-plus-lg me-4"></i>
                      新增其他地址
                    </button>
                  </div> 
                </div>
                <div className="form-check">
                  <div className="d-flex justify-content-between">
                    <div>
                      <input 
                        className={`form-check-input ${ errors.shippingMethod && 'is-invalid'}`}
                        type="radio" 
                        name="shippingMethod" 
                        id="shippingStore" 
                        value="shippingStore"
                        {...register('shippingMethod', { required: '請選擇配送方式'})}
                      />
                      <label className="form-check-label fs-6 fs-md-5 mb-2" htmlFor="shippingStore">
                        門市自取
                      </label>
                      <p className="fs-9 fs-md-7 text-info font-noto mb-4">下單後可於門市上班時間取貨</p>

                      { errors.shippingMethod && <div className="invalid-feedback">{ errors?.shippingMethod?.message }</div>}

                    </div>
                    <div className="div">
                      <h4  className="fs-5 fs-md-4">免運費</h4>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="text-center font-noto fs-9 fs-md-8 text-gray-50 border-top pt-5">
                物拾 Re:home 承諾：安心購買保障｜專業清潔整新｜永續環保選擇
              </footer>
            </section>
            
            {/* 配送地址填寫 Modal */}
            <div 
              className="modal fade" 
              id="addressModal" 
              tabIndex="-1" 
              aria-labelledby="addressModalLabel" 
              aria-hidden="true"
              ref={ addressModalRef }
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content px-md-8 py-md-10" style={{ borderRadius: 40 }}>
                  <div className="modal-header border-0">
                    <h1 className="modal-title fs-5 fs-md-4" id="addressModalLabel">請填寫配送資訊</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="row mb-4 mb-md-5">
                      <div className="col-md-4">
                        <label htmlFor="recipientName" className="form-label">收件人姓名</label>
                        <input 
                          type="text"
                          id="recipientName" 
                          name="recipientName"
                          className="form-control" 
                          placeholder="請輸入收件人姓名"
                        />
                      </div>
                      <div className="col-md-8">
                        <label htmlFor="recipientTel" className="form-label">收件人手機號碼</label>
                        <input 
                          type="tel"
                          id="recipientTel" 
                          name="recipientTel"
                          className="form-control" 
                          placeholder="請輸入收件人手機號碼"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4 mb-md-5">
                      <label htmlFor="recipientAddress" className="form-label">收件人地址</label>
                      <input 
                        type="text"
                        id="recipientAddress" 
                        name="recipientAddress"
                        className="form-control" 
                        placeholder="請輸入收件地址"
                      />
                    </div>
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" className="btn btn-pr">確認</button>
                  </div>
                </div> 
              </div>
            </div>

            <section className="checkout-card mb-8 mb-md-9">
            <h3 className="d-flex align-items-center fs-4 fs-md-3">
              <img src="images/icon/user.svg" className="me-4" style={{width: 32, height: 32}} alt="" />
              訂購人資訊
            </h3>
            <div className="row order-data-block">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label h6">
                  訂購人姓名
                  <span className="ms-2 text-danger">*</span>
                </label>
                <input 
                  name="name"
                  id="name"
                  type="text" 
                  placeholder="請輸入訂購人姓名"
                  className={`form-control input-gray-20 text-gray-95 font-noto ${ errors.name && 'is-invalid' }`}
                  {...register('name', { 
                    required: '姓名為必填',
                    minLength: { value: 2, message: '姓名需為 2-20 字，可使用 中文/英文。' },
                    maxLength: { value: 20, message: '姓名需為 2-20 字，可使用 中文/英文。' },
                    pattern: { value: /^[\u4e00-\u9fa5A-Za-z\s·]+$/, message: "姓名格式不正確" }
                  })}
                />

                { errors.name && <p className="invalid-feedback">{ errors?.name?.message }</p>}

              </div>
              <div className="col-md-6 mt-8 mt-md-0">
                <label htmlFor="tel" className="form-label h6">
                  聯絡電話
                  <span className="ms-2 text-danger">*</span>
                </label>
                <input 
                  name="tel"
                  id="tel"
                  type="tel" 
                  placeholder="請輸入聯絡電話"
                  className={`form-control input-gray-20 text-gray-95 font-noto ${ errors.tel && 'is-invalid' }`}
                  {...register('tel', { 
                    required: '聯絡電話為必填',
                    pattern: {
                      // 09 開頭手機 or 市話
                      value: /^(09\d{8}|0\d{1,2}-?\d{7,8})$/,
                      message: "電話格式不正確"
                    }
                  })}
                />

                { errors.tel && <p className="invalid-feedback">{ errors?.tel?.message }</p>}

              </div>
            </div>
            <div className="row order-data-block">
              <div className="col">
                <label htmlFor="email" className="form-label h6">
                  電子信箱
                  <span className="ms-2 text-danger">*</span>
                </label>
                <input 
                  name="email"
                  id="email"
                  type="email" 
                  placeholder="請輸入聯絡地址"
                  className={`form-control input-gray-20 text-gray-95 font-noto ${ errors.email && 'is-invalid' }`}
                  {...register('email', { 
                    required: "電子信箱為必填",
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "電子信箱格式不正確",
                    },
                  })}
                />

                { errors.email && <p className="invalid-feedback">{ errors?.email?.message }</p>}

              </div>
            </div>
            <div className="row order-data-block">
              <div className="col">
                <label htmlFor="address" className="form-label h6">
                  聯絡地址
                  <span className="ms-2 text-danger">*</span>
                </label>
                <input 
                  name="address"
                  id="address"
                  type="text" 
                  placeholder="請輸入聯絡地址"
                  className={`form-control input-gray-20 text-gray-95 font-noto ${ errors.address && 'is-invalid' }`}
                  {...register('address', { 
                    required: '聯絡地址為必填',
                    minLength: { value: 6, message: "地址格式不完整" },
                  })}
                />

                { errors.address && <p className="invalid-feedback">{ errors?.address?.message }</p>}

              </div>
            </div>
            <div className="row order-data-block">
              <div className="col">
                <h6 className="mb-0">
                  付款方式
                  <span className="ms-2 text-danger">*</span>
                </h6>
                <div className="pt-3 pb-0 py-md-8 font-noto">
                  <div className="form-check py-4 mb-3">
                    <input 
                      className={`form-check-input ${ errors.payment && 'is-invalid' }`}
                      type="radio" 
                      name="payment" 
                      id="paymentCard"
                      value="paymentCard"
                      {...register('payment', { 
                        required: '請選擇付款方式'
                      })}
                    />
                    <label className="form-check-label mb-4" htmlFor="paymentCard">
                      信用卡/金融卡
                    </label>

                    { errors.payment && <p className="invalid-feedback">{ errors?.payment?.message }</p>}

                    
                    <div className="vstack gap-3">
                    {/* 信用卡/金融卡 1 */}
                      <div className="position-relative">
                        <input type="radio" className="btn-check" name="creditCard" id="credit" autoComplete="off" defaultChecked />
                        <label 
                          className="btn border label-btn" htmlFor="credit">
                          <div className="d-flex justify-content-start align-items-center">
                            <img src="images/icon/visa-brandmark.svg" style={{width: "40"}} alt="visa-icon" />
                            <p className="text-gray-95 ms-4">****1356</p>
                          </div>
                        </label>
                      </div>

                      {/* 新增選項 */}
                      <button type="button" className="btn add-option">
                        <i className="bi bi-plus-lg me-4"></i>
                        新增其他信用卡
                      </button>
                    </div>
                  </div>
                  <div className="form-check py-4 mb-3">
                    <input 
                      className={`form-check-input ${ errors.payment && 'is-invalid' }`}
                      type="radio" 
                      name="payment" 
                      id="paymentTransfer" 
                      value="paymentTransfer"
                      {...register('payment', { 
                        required: '請選擇付款方式'
                      })}
                    />
                    <label className="form-check-label" htmlFor="paymentTransfer">
                      轉帳
                    </label>

                    { errors.payment && <p className="invalid-feedback">{ errors?.payment?.message }</p>}
                    
                  </div>
                  <div className="form-check py-4">
                    <input 
                      className={`form-check-input ${ errors.payment && 'is-invalid' }`}
                      type="radio" 
                      name="payment" 
                      id="paymentCash" 
                      value="paymentCash"
                      {...register('payment', { 
                        required: '請選擇付款方式'
                      })}
                    />
                    <label className="form-check-label" htmlFor="paymentCash">
                      貨到付款
                    </label>

                    { errors.payment && <p className="invalid-feedback">{ errors?.payment?.message }</p>}

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
                <div className="pt-3 pb-0 py-md-8 font-noto">
                  <div className="form-check py-4 mb-3">
                    <input 
                      className={`form-check-input ${ errors.invoiceType && 'is-invalid' }`}
                      type="radio" 
                      name="invoiceType" 
                      id="mobile" 
                      value='mobile'
                      {...register('invoiceType', { 
                        required: '請選擇發票類型'
                      })}
                    />
                    <label className="form-check-label mb-3" htmlFor="mobile">
                      手機載具
                    </label>

                    { errors.invoiceType && <p className="invalid-feedback">{ errors?.invoiceType?.message }</p>}

                    { invoiceType === 'mobile' && (
                      <div className="vstack gap-3 font-noto">
                        <input 
                          type="text" 
                          name="mobileCarrier"
                          id="mobileCarrier"
                          className={`form-control input-gray-20 text-gray-95 ${errors.mobileCarrier && 'is-invalid'}`}
                          placeholder="請輸入手機載具"
                          aria-label="手機載具"
                          {...register('mobileCarrier', {
                            required: '請輸入手機載具',
                            pattern: {
                              value: /^\/[A-Z0-9]{7}$|^[A-Z0-9]{16}$/,
                              message: '載具格式不正確'
                            }
                          })}
                        />

                        {errors.mobileCarrier && <p className="invalid-feedback">{ errors?.mobileCarrier?.message }</p>}
                      </div>
                    )}
                    
                  </div>
                  <div className="form-check py-4 mb-3">
                    <input 
                      className={`form-check-input ${ errors.invoiceType && 'is-invalid' }`}
                      type="radio" 
                      name="invoiceType" 
                      id="company" 
                      value='company'
                      {...register('invoiceType', { 
                        required: '請選擇發票類型'
                      })}
                    />
                    <label className="form-check-label mb-3" htmlFor="company">
                      公司發票
                    </label>

                    { errors.invoiceType && <p className="invalid-feedback">{ errors?.invoiceType?.message }</p>}

                    { invoiceType === 'company' && (
                      <div className="vstack gap-3 font-noto">
                        <input 
                          type="number" 
                          name="companyNo"
                          id="companyNo"
                          className={`form-control input-gray-20 text-gray-95 ${errors.companyNo && 'is-invalid'}`}
                          placeholder="請輸入公司統一編號"
                          aria-label="公司統一編號"
                          {...register('companyNo', {
                            required: '請輸入統一編號',
                            pattern: {
                              value: /^\d{8}$/,
                              message: '統一編號格式不正確'
                            }
                          })}
                        />

                        { errors.companyNo && <p className="invalid-feedback">{ errors?.companyNo?.message }</p>}
                        
                      </div>
                    )}
                    
                  </div>
                  <div className="form-check py-4">
                    <input 
                      className={`form-check-input ${ errors.invoiceType && 'is-invalid' }`}
                      type="radio" 
                      name="invoiceType" 
                      id="donate" 
                      value='donate'
                      {...register('invoiceType', { 
                        required: '請選擇發票類型'
                      })}
                    />
                    <label className="form-check-label" htmlFor="donate">
                      捐贈發票
                    </label>

                    { errors.invoiceType && <p className="invalid-feedback">{ errors?.invoiceType?.message }</p>}

                  </div>
                </div>
                
              </div>
            </div>
          </section>

          <div className="text-center">
            <button type="submit" className="btn btn-pr">送出訂單</button>
          </div>

          </form>
        </div>
      </div>
    </div>
    

    {/* 送出表單 Modal */}
    <div 
      className="modal fade" 
      id="orderSubmitModal" 
      tabIndex="-1" 
      aria-labelledby="orderSubmitModalLabel" 
      aria-hidden="true"
      ref={ orderSubmitModalRef }
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content px-md-8 py-md-10 d-flex justify-contentent-center align-items-center" style={{ borderRadius: 40 }}>
          <div className="modal-body text-center">
            { submitModal.type === 'success' ? (<>
              <i className="bi bi-check2-circle text-success fs-2"></i>
              <h4 className="mb-2">{ submitModal.title }</h4>
              <p className="text-gray-50">{ submitModal.message }</p>
            </>) : (<>
              <i className="bi bi-emoji-frown text-danger fs-2"></i>
              <h4 className="mb-2">{ submitModal.title }</h4>
              <p className="text-gray-50">{ submitModal.message }</p>
            </>) }
            
          </div>
          <div className="modal-footer border-0">
            <Link to="/" className="btn btn-pr">確認</Link>
          </div>
        </div>
      </div>
    </div>
    
    
  </div>
  </>)
}

export default CheckoutDetail