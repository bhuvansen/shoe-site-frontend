import React from "react"
import { useDispatch, useSelector } from "react-redux"
import API from "../../../backend"
import { updateFieldState } from "../../../store/action/form-action"
import ManageCartButton from "../button/ManageCartButton"
import "./CartCard.css"
const CartCard = ({ cartArray }) => {
  const form = useSelector((state) => state.formReducer)
  const dispatch = useDispatch()

  const checkboxClicked=(product)=>{
    let cart = form.userCart
    for(let i in cart){
      if(cart[i]._id===product._id && cart[i].size===product.size){
        cart[i].isChecked = !cart[i].isChecked
      }
    }
    dispatch(updateFieldState("userCart", cart))
  }
  

  return (
    <div className="bg-light cart-card">
      <h2 className="header-cart">Cart Items</h2>
      <div className="horizontal-line"></div>
      {
        cartArray.length === 0 ? (
          <h4 className="mt-5">Your cart is empty</h4>
        ):(
          cartArray.map((product, index) => {
          return (
            <div key={index}>
              <div className="cart-details" >
                <div className="d-flex align-items-center">
                  <input type="checkbox" id={index} name={product.name} value="Bike" className="checkbox-cart" checked={product.isChecked} onChange={()=>checkboxClicked(product)}/>
                  <div className="cart-image-section">
                    <img src={`${API}product/photo/${product._id}`} alt="" />
                  </div>
                  <h5 className="m-5">{product.name}</h5>
                  <h5 className="m-5">{`Size: ${product.size}`}</h5>
                </div>
                <div className="button-price">
                  <ManageCartButton
                    className="cart-button"
                    cartQuantity={product.quantity}
                    selectedProduct={product}
                  />
                  <span>Rs. {product.price}</span>
                </div>
              </div>
              <div className="horizontal-line" ></div>
            </div>
          )
        })
        )
      }
      {/* {cartArray &&
        cartArray.map((product, index) => {
          return (
            <div key={index}>
              <div className="cart-details" >
                <div className="d-flex align-items-center">
                  <input type="checkbox" id={index} name={product.name} value="Bike" className="checkbox-cart" checked={product.isChecked} onChange={()=>checkboxClicked(product)}/>
                  <div className="cart-image-section">
                    <img src={`${API}product/photo/${product._id}`} alt="" />
                  </div>
                  <h5 className="m-5">{product.name}</h5>
                  <h5 className="m-5">{`Size: ${product.size}`}</h5>
                </div>
                <div className="button-price">
                  <ManageCartButton
                    className="cart-button"
                    cartQuantity={product.quantity}
                    selectedProduct={product}
                  />
                  <span>Rs. {product.price}</span>
                </div>
              </div>
              <div className="horizontal-line" ></div>
            </div>
          )
        })} */}
    </div>
  )
}

export default CartCard
