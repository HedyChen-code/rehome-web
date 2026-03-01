import axios from "axios";
import { useEffect, useState } from "react";
import { formateNumber } from "../../utils/filter";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router";


const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Cart = () => {
  const [ cart, setCart ] = useState({ cart: [] });
  
  const navigate = useNavigate();

  const getCart = async () => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/cart`;
      const res = await axios.get(url);
      setCart(res.data.data);
    } catch (error) {
      toast.error(
          `取得購物車資料失敗: ${error.response?.data?.message}，請洽工作人員`,
        );
    }
  }

  const updateCart = async (cartId, productId, qty=1) => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/cart/${cartId}`;
      const data = {
        product_id: productId,
        qty
      }
      const res = await axios.put(url, { data });
      getCart();
      toast.success('修改商品數量成功');
    } catch (error) {
      toast.error(
          `修改購物車資料失敗: ${error.response?.data?.message}，請洽工作人員`,
        );
    }
  }

  const deleteCart = async (id) => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/cart/${id}`;
      const res = await axios.delete(url);
      getCart();
      toast.success('刪除這一筆購物車成功');
    } catch (error) {
      toast.error(
          `清除該筆購物車失敗: ${error.response?.data?.message}，請洽工作人員`,
        );
    }
  }

  const deleteCartAll = async () => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/carts`;
      const res = await axios.delete(url);
      getCart();
      toast.success('清空購物車成功！')
    } catch (error) {
      toast.error(
          `清空購物車失敗: ${error.response?.data?.message}，請洽工作人員`,
        );
    }
  }

  const goToCheckout = () => {
    navigate('/checkout/detail');
  }

  useEffect(() => {
    getCart();
  }, [])

  return (<>
    { !cart ? (
      <div className="text-center mt-5">載入中...</div>
    ) : (<>
      <div className="bg-light-grey py-8 py-md-12">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="container text-gray-95" style={{ marginTop: '144px' }}>
          <div className="row justify-content-center">
            <div className="col">
              <form action="">
                <section className="checkout-card mb-10 mb-md-12 fs-md-6">
                  <div className="container">
                    <h2 className="mb-4">購物車清單</h2>
                    <div className="text-end mb-2">
                      <button 
                        type="button" 
                        className="btn btn-outline-danger"
                        onMouseEnter={ (e) => e.target.style.color = "#f8f9fa" }
                        onMouseLeave={ (e) => e.target.style.color = "" }
                        onClick={ deleteCartAll }
                      >
                        清空購物車
                      </button>
                    </div>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col" style={{width: "15%"}}></th>
                          <th scope="col" style={{width: "40%"}}>品名</th>
                          <th scope="col" style={{width: "30%"}}>數量 / 單位</th>
                          <th scope="col" style={{width: "15%"}}>小計</th>
                        </tr>
                      </thead>
                      <tbody>
                        { cart.carts && cart.carts.length > 0 ? (
                          cart.carts.map( cartItem => (
                            <tr key={ cartItem.id}>
                              <td>
                                <button 
                                  type="button" 
                                  className="btn btn-sm btn-outline-danger"
                                  onMouseEnter={ (e) => e.target.style.color = "#f8f9fa" }
                                  onMouseLeave={ (e) => e.target.style.color = "" }
                                  onClick={ () => deleteCart(cartItem.id) }
                                >
                                  刪除
                                </button>
                              </td>
                              <td>{ cartItem.product.title }</td>
                              <td>
                                <div className="input-group mb-3">
                                  <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="cart-product-num" 
                                    aria-label="cart-product-num" 
                                    aria-describedby="cart-product-num" 
                                    defaultValue={ cartItem.qty }
                                    onChange={ (e) => updateCart(cartItem.id, cartItem.product_id, Number(e.target.value)) }
                                  />
                                  <span className="input-group-text" id="cart-product-num">
                                    { cartItem.product.unit }
                                  </span>
                                </div>
                              </td>
                              <td className="text-end">{ formateNumber(cartItem.final_total) }</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3">尚無購物車資料</td>
                          </tr>
                        ) }
                        
                      </tbody>
                      <tfoot>
                        <tr className="table-gray">
                          <td className="text-end" colSpan="3">總計</td>
                          <td className="text-end">$ { formateNumber(cart.final_total) }</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </section>
              </form>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button type="button" className="btn btn-pr" onClick={ goToCheckout }>去買單</button>
        </div>
      </div>
    </>
      
    )}
    
  </>)
}

export default Cart