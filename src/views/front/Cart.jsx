import axios from "axios";
import { useEffect, useState } from "react";
import { formateNumber } from "../../utils/filter";
import { Link, useNavigate } from "react-router";
import useMessage from "../../hooks/useMessage";
import { useDispatch } from "react-redux";
import { setCart } from "../../slice/cartSlice";
import ScrollToTop from "../../components/ScrollToTop"

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Cart = () => {
  const [cartData, setCartData] = useState({ carts: [] });
  const navigate = useNavigate();
  const { showError, showSuccess } = useMessage();
  const dispatch = useDispatch();

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

  const updateCartNum = async (cartId, productId, qty = 1) => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/cart/${cartId}`;
      const data = {
        product_id: productId,
        qty,
      };
      const res = await axios.put(url, { data });
      getCart();
      showSuccess("修改商品數量成功");
    } catch (error) {
      showError(
        `修改購物車資料失敗: ${error.response?.data?.message}，請洽工作人員`,
      );
    }
  };

  const deleteCart = async (id) => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/cart/${id}`;
      const res = await axios.delete(url);
      getCart();
      showSuccess("刪除這一筆購物車成功");
    } catch (error) {
      showError(
        `清除該筆購物車失敗: ${error.response?.data?.message}，請洽工作人員`,
      );
    }
  };

  const deleteCartAll = async () => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/carts`;
      const res = await axios.delete(url);
      getCart();
      showSuccess("清空購物車成功！");
    } catch (error) {
      showError(
        `清空購物車失敗: ${error.response?.data?.message}，請洽工作人員`,
      );
    }
  };

  const goToCheckout = () => {
    navigate("/checkout/detail");
    navigate("/checkout/detail");
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {!cartData ? (
        <div className="text-center mt-5">載入中...</div>
      ) : (
        <>
          <div className="bg-light-gray py-8 py-md-12">
            <div
              className="container text-gray-95"
              style={{ marginTop: "144px" }}
            >
              <div className="row justify-content-center mb-10 mb-md-12 fs-md-6">
                <div className="col-12 mb-6 mb-md-8">
                  <form action="">
                    <section className="checkout-card">
                      <div className="container">
                        <h2 className="mb-6 fs-3 fs-md-2 pb-4 border-bottom">購物車清單</h2>
                        <div className="text-end mb-2">
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onMouseEnter={(e) =>
                              (e.target.style.color = "#f8f9fa")
                            }
                            onMouseLeave={(e) => (e.target.style.color = "")}
                            onClick={deleteCartAll}
                          >
                            清空購物車
                          </button>
                        </div>
                        <table className="table table-hover fs-7 fs-md-6">
                          <thead className="text-center text-md-start">
                            <tr>
                              <th scope="col" className="col-del"></th>
                              <th scope="col" className="col-title">
                                品名
                              </th>
                              <th scope="col" className="col-qty">
                                數量 / 單位
                              </th>
                              <th scope="col" className="col-total">
                                小計
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {cartData.carts && cartData.carts.length > 0 ? (
                              cartData.carts.map((cartItem) => (
                                <tr key={cartItem.id}>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-danger"
                                      onMouseEnter={(e) =>
                                        (e.target.style.color = "#f8f9fa")
                                      }
                                      onMouseLeave={(e) =>
                                        (e.target.style.color = "")
                                      }
                                      onClick={() => deleteCart(cartItem.id)}
                                    >
                                      刪除
                                    </button>
                                  </td>
                                  <td>{cartItem.product.title}</td>
                                  <td>
                                    <div className="d-flex align-items-center flex-wrap flex-md-nowrap fs-8 fs-md-6">
                                      <div className="input-group me-md-3 w-auto flex-nowrap">
                                        <button
                                          className="btn btn-outline-danger"
                                          disabled={cartItem.qty <= 1}
                                          onMouseEnter={(e) =>
                                            (e.target.style.color = "#f8f9fa")
                                          }
                                          onMouseLeave={(e) =>
                                            (e.target.style.color = "")
                                          }
                                          onClick={() =>
                                            updateCartNum(
                                              cartItem.id,
                                              cartItem.product_id,
                                              cartItem.qty - 1,
                                            )
                                          }
                                        >
                                          <i className="bi bi-dash-circle"></i>
                                        </button>
                                        <input
                                          type="text"
                                          inputMode="numeric"
                                          pattern="[0-9]*"
                                          className="form-control text-center bg-white qty-input"
                                          // style={{flex: '0 0 70px'}}
                                          aria-label="cart-product-num"
                                          aria-describedby="cart-product-num"
                                          value={cartItem.qty}
                                          readOnly
                                        />
                                        <button
                                          className="btn btn-outline-danger"
                                          onMouseEnter={(e) =>
                                            (e.target.style.color = "#f8f9fa")
                                          }
                                          onMouseLeave={(e) =>
                                            (e.target.style.color = "")
                                          }
                                          onClick={() =>
                                            updateCartNum(
                                              cartItem.id,
                                              cartItem.product_id,
                                              cartItem.qty + 1,
                                            )
                                          }
                                        >
                                          <i className="bi bi-plus-circle"></i>
                                        </button>
                                      </div>
                                      <span className="" id="cart-product-num">
                                        / {cartItem.product.unit}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-end text-nowrap fs-8 fs-md-6 col-total-cell">
                                    $ {formateNumber(cartItem.final_total)}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="3">尚無購物車資料</td>
                              </tr>
                            )}
                          </tbody>
                          <tfoot>
                            <tr className="table-gray">
                              <td className="text-end" colSpan="3">
                                總計
                              </td>
                              <td className="text-end text-nowrap">
                                $ {formateNumber(cartData.final_total)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </section>
                  </form>
                </div>
                <div className="col-12">
                  <section className="checkout-card">
                    <h4 className="mb-6 mb-md-8 pb-4 border-bottom">結帳明細</h4>
                    <div className="d-flex justify-content-between align-items-center">
                      <p>商品總金額</p>
                      <p className="text-end">$ {formateNumber(cartData.final_total)}</p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            <div className="text-center">
              { cartData.carts.length > 0 ? (
                <button
                  type="button"
                  className="btn btn-pr"
                  onClick={ goToCheckout }
                >
                  去買單
                </button>
              ) : (<>
                <button
                  type="button"
                  className="btn btn-pr0 mb-4"
                  disabled
                >
                  去買單
                </button>
                <div className="text-danger">
                  <p>還沒有找到心儀的商品嗎？</p>
                  <p>請前往<Link to='/products' className="toProducts px-2 text-info">賣場選購</Link>，謝謝！</p>
                </div>
                
              </>) }
              
            </div>
          </div>
          <ScrollToTop />
        </>
      )}
    </>
  );
};

export default Cart;
