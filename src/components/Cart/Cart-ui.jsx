import axios from "axios"
import React, { useEffect } from "react"
import { Col, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { isAuthenticated } from "../../API/authentication"
import API from "../../backend"
import { updateFieldState } from "../../store/action/form-action"
import Button from "../common/button/button"
import CartCard from "../common/CartCard/CartCard"
import NavbarApp from "../common/Navbar/NavbarApp"
import "./Cart.css"
import StripeCheckout from 'react-stripe-checkout'

const Cart = () => {
  const form = useSelector((state) => state.formReducer)
  const dispatch = useDispatch()
  const { user, token } = isAuthenticated()

  useEffect(() => {
    axios
      .get(`${API}user/${user._id}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((cart) => {
        let cartArray = cart.data
        cartArray.forEach((item)=>{
          item.isChecked = true
        })
        dispatch(updateFieldState("userCart", cartArray))
        dispatch(updateFieldState("selectedSize", ""))
      })
  }, [])
  const numberOfItems = (cart) => {
    let quantity = 0
    if(cart){
      if ( cart.length > 0) {
        cart.forEach((item) => {
          quantity = item.isChecked ? quantity + item.quantity : quantity
        })
      }
    }
    return quantity
  }
  const totalCost = (cart) => {
    let price = 0
    if(cart){
      if (cart.length > 0) {
        cart.forEach((item) => {
          price = item.isChecked ? price + (item.price*item.quantity) : price
        })
      }
    }
    return price
  }

  const makePayment = () => {
    axios
      .post(`${API}stripe/create-checkout-session`, {
        cartItems: form.userCart.filter(item=>item.isChecked===true),
        userId: user._id,
      })
      .then((res) => {
        if (res.data.url) {
          localStorage.setItem("cart", JSON.stringify(form.userCart))
          localStorage.setItem("amount", JSON.stringify(totalCost(form.userCart)))
          window.location.href = res.data.url
        }
      })
      .catch((err) => {
        console.log(err.message)
      })

  };

  return (
    <>
      <NavbarApp />
      <h1 className="p-4 pb-0 m-0 font-weight-700">Your Cart</h1>
      <div className="p-4">
        <Row>
          <Col lg={8}>
            <CartCard cartArray={form.userCart} />
          </Col>
          <Col lg={4}>
            <div className="bg-light text-left price-box">
              <span className="m-0 price-header">Subtotal</span>
              <span>{`(${numberOfItems(form.userCart)} ${numberOfItems(form.userCart) > 1 ? "items" : "item"})`}</span>
              <h5 className="display-5">{`Rs. ${totalCost(form.userCart)}`}</h5>
                <Button onClick={makePayment} Label="Place the order"/>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Cart
