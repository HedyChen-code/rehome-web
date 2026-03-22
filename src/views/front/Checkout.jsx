import axios from "axios";
import { useEffect, useRef, useState } from "react";
import * as bootstrap from 'bootstrap';
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";
import ScrollToTop from "../../components/ScrollToTop";
import { formateNumber } from "../../utils/filter";
import useMessage from "../../hooks/useMessage";
import { useDispatch } from "react-redux";
import { setCart } from "../../slice/cartSlice";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Checkout = () => {
  const addressModalRef = useRef(null);
  const creditCardModalRef = useRef(null);
  const orderSubmitModalRef = useRef(null);
  const [ submitModal, setSubmitModal ] = useState({});
  const [ selectedAddressId, setSelectedAddressId ] = useState(null);
  const [ addressModalType, setAddressModalType ] = useState(''); // 'add', 'edit'
  const navigate = useNavigate();
  const normalAddresses = [
    {
      id: 'normal-1',
      name: '陳小明',
      tel: '+886 444556789',
      address: '台南縣東平平區小羊路日四段12號'
    },
    {
      id: 'normal-2',
      name: '王省省',
      tel: '+886 912342234',
      address: '台西縣安安區太陽路二段243號'
    }
  ];
  const homeAddresses = [
    {
      id: 'home-1',
      name: '王省省',
      tel: '+886 912342234',
      address: '台西縣安安區太陽路二段243號'
    }
  ];
  const [cartData, setCartData] = useState({ carts: [] });
  const { showError, } = useMessage();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm(
    { mode: "onChange" }
  );

  const shippingMethod = useWatch({ control, name: 'shippingMethod' });
  const shippingFree = (
    shippingMethod === 'shippingNormal'
    ? 500
    : shippingMethod === 'shippingHome'
    ? 1500
    : 0
  );

  const payment = useWatch({ control, name: 'payment' });

  const invoiceType = useWatch({ control, name: 'invoiceType' }); // mobile / company /donate

  const onSubmit = async (formData) => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/order`;
      const data = {
        data: {
          user: formData,
          message: formData.message
        }
      }
      const res = await axios.post(url, data);
      if (res.data.success) {
        dispatch(setCart({ carts: [], total: 0, final_total: 0 }));

        setSubmitModal({
        type: 'success', title: '已成功送出！', message: '感謝您的訂購！我們已收到您的資料。'
        })
        openOrderSubmitModal();
      }
    } catch {
      setSubmitModal({
        type: 'error', title: '送出失敗', message: '系統暫時無法處理您的請求，請稍後再試。'
      })
      openOrderSubmitModal();
    }
  }

  const submitOrder = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  }

  const openAddressModal = (type) => {
    addressModalRef.current.show();
    setAddressModalType(type);
  }
  const closeAddressModal = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    addressModalRef.current.hide();
  }

  const openCreditCardModal = () => {
    creditCardModalRef.current.show();
  }
  const closeCreditCardModal = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    creditCardModalRef.current.hide();
  }

  const openOrderSubmitModal = () => {
    orderSubmitModalRef.current.show();
  }

  const handleSubmitCheck = () => {
    navigate('/');

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    orderSubmitModalRef.current.hide();
  }

  useEffect(() => {
    addressModalRef.current = new bootstrap.Modal('#addressModal');
    creditCardModalRef.current = new bootstrap.Modal('#creditCardModal');
    orderSubmitModalRef.current = new bootstrap.Modal('#orderSubmitModal');

    const getCart = async () => {
      try {
        const url = `${API_BASE}/api/${API_PATH}/cart`;
        const res = await axios.get(url);
        setCartData(res.data.data);
        dispatch(setCart(res.data.data));
      } catch (error) {
        showError(
          `取得購物車資料失敗: ${error.response?.data?.message}，請洽工作人員`,
        );
      }
    };
    getCart();
    
  }, [dispatch, showError])

  const renderAddressCards = (list, radioName) => (
    list.map((item, index) => {
      const radioId = `${radioName}-${item.id || index}`;
      return (
        <div className="row d-flex justify-content-between align-items-center"  key={item.id || radioId}>
          <div className="col-10 col-md-11">
            <input
              type="radio"
              className="btn-check"
              name={radioName}
              id={radioId}
              checked={ selectedAddressId === item.id }
              onChange={() => setSelectedAddressId(item.id)}
            />
            <label 
              className="btn border font-noto label-btn" htmlFor={radioId}>
              <div className="text-start">
                <p className="text-gray-95 mb-2">
                  {item.name}<span className="fs-8 fs-md-7 text-gray-50">{item.tel}</span>
                </p>
                <p className="fs-9 fs-md-8 text-gray-50">{item.address}</p>
              </div>
            </label>
          </div>
          <div className="col-2 col-md-1 d-flex justify-content-center align-items-center px-0">
            <button type="button" className="edit-btn" onClick={ ()=> openAddressModal('edit') }>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 16H16C15.4696 16 14.9609 16.2107 14.5858 16.5858C14.2107 16.9609 14 17.4696 14 18V32C14 32.5304 14.2107 33.0391 14.5858 33.4142C14.9609 33.7893 15.4696 34 16 34H30C30.5304 34 31.0391 33.7893 31.4142 33.4142C31.7893 33.0391 32 32.5304 32 32V25" stroke="#B8B8C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M30.5 14.5002C30.8978 14.1024 31.4374 13.8789 32 13.8789C32.5626 13.8789 33.1022 14.1024 33.5 14.5002C33.8978 14.8981 34.1213 15.4376 34.1213 16.0002C34.1213 16.5628 33.8978 17.1024 33.5 17.5002L24 27.0002L20 28.0002L21 24.0002L30.5 14.5002Z" stroke="#B8B8C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
      );
    })
  );

  return (<>
  <div className="bg-light-gray py-8 py-md-12">
    <div className="container text-gray-95" style={{ marginTop: '136px' }}>
      <div className="row justify-content-center">
        <div className="col-12">
          <form onSubmit={ submitOrder }>
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
                    {renderAddressCards(normalAddresses, 'normalAddr')}
                    <button type="button" className="btn add-option" onClick={() => openAddressModal('add')}>
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
                    {renderAddressCards(homeAddresses, 'homeAddr')}
                    <button type="button" className="btn add-option" onClick={() => openAddressModal('add')}>
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
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content px-6 py-8 px-md-8 py-md-10" style={{ borderRadius: 40 }}>
                  <div className="modal-header border-0 bg-gray-20">
                    <h1 className="modal-title fs-5 fs-md-4" id="addressModalLabel">
                      { addressModalType === 'edit' ? '編輯配送資訊' : '新增配送資訊'}
                    </h1>
                    <button type="button" className="btn-close" onClick={ closeAddressModal }></button>
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
                          {...register('shippingData.name', { message: '請輸入收件人姓名' })}
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
                          {...register('shippingData.tel', { message: '請輸入收件人手機號碼' })}
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
                        {...register('shippingData.address', { message: '請輸入收件地址' })}
                      />
                    </div>
                  </div>
                  <div className="modal-footer border-0 d-flex mx-auto">
                    <button type="button" className="btn btn-secondary me-4 me-md-6" onClick={ closeAddressModal }>取消</button>
                    <button type="button" className="btn btn-primary">確認</button>
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

                    { payment === "paymentCard" && (<>
                      <div className="vstack gap-3">
                      {/* 信用卡/金融卡 1 */}
                        <div className="col-md-8">
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
                        <button type="button" className="btn add-option" onClick={ openCreditCardModal }>
                          <i className="bi bi-plus-lg me-4"></i>
                          新增其他信用卡
                        </button>
                      </div>
                    </>)}

                    

                    {/* 新增信用卡 Modal */}
                    <div 
                      className="modal fade" 
                      id="creditCardModal" 
                      tabIndex="-1" 
                      aria-labelledby="creditCardModalLabel" 
                      aria-hidden="true"
                      ref={ creditCardModalRef }
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content px-6 py-8 px-md-8 py-md-10 d-flex justify-contentent-center align-items-center" style={{ borderRadius: 40 }}>
                          <div className="modal-header w-100 bg-gray-20 mb-4 mb-md-6">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">新增信用卡</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body text-center">
                            <div className="row mb-4 mb-md-5">
                              <div className="col">
                                <input 
                                  type="text"
                                  id="creditNo" 
                                  name="creditNo"
                                  className="form-control"
                                  placeholder="請輸入信用卡卡號"
                                />
                              </div>
                            </div>
                            <div className="row mb-4 mb-md-5">
                              <div className="col-md-4">
                                <input 
                                  type="text"
                                  id="creditNo" 
                                  name="creditNo"
                                  className="form-control"
                                  placeholder="有效月"
                                />
                              </div>
                              <div className="col-md-4">
                                 <input 
                                  type="text"
                                  id="creditNo" 
                                  name="creditNo"
                                  className="form-control"
                                  placeholder="有效年"
                                />
                              </div>
                              <div className="col-md-4">
                                 <input 
                                  type="text"
                                  id="creditNo" 
                                  name="creditNo"
                                  className="form-control"
                                  placeholder="輸入末三碼"
                                />
                              </div>
                            </div>  
                          </div>
                          <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary me-4 me-md-6" onClick={ closeCreditCardModal }>取消</button>
                            <button type="button" className="btn btn-primary" onClick={ closeCreditCardModal }>確認</button>
                          </div>
                        </div>
                      </div>
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

                    {/* 當選取到轉帳 radio 時，顯示出 div */}
                    { payment === "paymentTransfer" && (
                      <div className="row">
                        <div className="col-md-8">
                          <div className="card mt-4 align-items-start" style={{ borderRadius: "8px" }}>
                            <h6>轉帳繳費帳號</h6>
                            <div className="mb-6">
                              <p>銀行代碼：822（中國信託）</p>
                              <p>轉帳帳號：123456789012</p>
                            </div>
                            <button className="btn btn-pr">發送到手機</button>
                          </div>
                        </div>
                      </div>
                      
                    )}

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

          <div className="col-12mb-10 mb-md-12">
            <section className="checkout-card">
              <h4 className="mb-6 mb-md-8 pb-4 border-bottom">付款明細</h4>
              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p>商品總金額</p>
                  <p className="text-end">$ {formateNumber(cartData.final_total)}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p>運費</p>
                  <p className="text-end">
                    {/* 當配送方式選擇一般宅配，運費 500 元。送貨到家 1500 元。門市自取 0 元 */}
                    $ {formateNumber(shippingFree)}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center border-top border-3 mb-2 py-2">
                  <p>總付款金額</p>
                  <p className="text-end">
                    {/* 商品總金額與運費加總 */}
                    $ {formateNumber((cartData?.final_total || 0) + shippingFree)}
                  </p>
                </div>
              </div>
            </section>
          </div>

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
        <div className="modal-content px-6 py-8 px-md-8 py-md-10 d-flex justify-contentent-center align-items-center" style={{ borderRadius: 40 }}>
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
            <button type="button" className="btn btn-pr" onClick={ handleSubmitCheck }>確認</button>
          </div>
        </div>
      </div>
    </div>
    <ScrollToTop />
    
    
  </div>
  </>)
}

export default Checkout
