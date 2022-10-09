import axios from "axios"
import React, { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { isAuthenticated } from "../../API/authentication"
import API from "../../backend"
import { handleNonEmptyFieldCSS } from "../../common/utils"
import { updateFieldState } from "../../store/action/form-action"
import ManageCartButton from "../common/button/ManageCartButton"
import InputDropdown from "../common/Input-Fields/InputDropdown"
import Popup from "../common/Modal/Modal"
import NavbarApp from "../common/Navbar/NavbarApp"
import ProductCard from "../common/Product/ProductCard"
import "./ProductsPage.css"

const ProductPage = () => {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let sizeList = [{}]
  const form = useSelector((state) => state.formReducer)
  const dashboardForm = useSelector((state) => state.dashboardReducer) 
  const accessCheck = useSelector((state) => state.accessReducer)


  const { user, token } = isAuthenticated()

  useEffect(() => {
    axios.get(`${API}product/${productId}`).then((product) => {
      let productDetail = {
        name: product.data.name,
        description: product.data.description,
        category: product.data.category,
        price: product.data.price,
        quantity: product.data.quantity,
        _id: product.data._id,
      }
      let j = 0
      for(let i in product.data.quantity){
        sizeList[j] = {name:product.data.quantity[i].size, _id:product.data.quantity[i].size}
        j=j+1
      }
      if(accessCheck.isSignedIn){
        axios.get(`${API}user/${user._id}/cart`,{
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }).then((cart)=>{
          let quantity = 0
          cart.data.filter((item)=>item._id===productId).forEach((data)=>quantity = quantity + data.quantity)
          dispatch(updateFieldState("quantityInCart", quantity))
        })
      }
      dispatch(updateFieldState("sizeList", sizeList))
      dispatch(updateFieldState("productDetail", productDetail))
    })
  }, [])

  const addToCart = (product) => {
    if(form.selectedSize===""){
      dispatch(updateFieldState("showModal", true))
    } else if (user) {
      axios
        .put(
          `${API}user/${user._id}/cart`,
          {
            _id: product._id,
            name: product.name,
            category: product.category,
            price: product.price,
            quantity: 1,
            size: parseInt(form.selectedSize)
          },
          {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          }
        )
        .then((resp) => {
          dispatch(updateFieldState("userCart", resp.data))
          let cart = resp.data.filter((item) => item._id === productId)
          console.log("cart", cart)
          dispatch(updateFieldState("quantityInCart", cart[0].quantity))
        })
    } else {
      dispatch(updateFieldState("showModal", true))
    }
  }

  const onInputChange = (event) => {
    const value = event.target.value
    dispatch(updateFieldState("selectedSize", value))
    handleNonEmptyFieldCSS(event)
  }

  const handleCloseButton=()=>{
    dispatch(updateFieldState("showModal", false))
  }
  return (
    <>
      <NavbarApp />
      <div className="p-5">
        <Row>
          <Col className="img-part bg-light" lg={5}>
            <img src={`${API}product/photo/${productId}`} alt="" />
          </Col>
          <Col className="text-left product-details" lg={7}>
            <h1 className="product-name">
              {form.productDetail ? (form.productDetail.name ? form.productDetail.name : "") : ""}
            </h1>
            <p className="m-0 display-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ullam nam omnis nulla cumque
              exercitationem, tempora magni autem quo assumenda minus architecto molestiae deserunt. Voluptate sed eum
              sit blanditiis reprehenderit.
            </p>
            <br />
            <div className="mb-40">
              <span className="m-0 display-6 mb-5">
                Rs. {form.productDetail ? (form.productDetail.price ? form.productDetail.price : "") : ""}
              </span>
            </div>
            <Row>
              <Col lg={4} md={4} >
            {form.quantityInCart > 0 ? (
              <ManageCartButton
                className="product-page-cart-button"
                cartQuantity={form.quantityInCart}
                selectedProduct={form.productDetail}
              />
            ) : (
              <div className="product-page-cart-button card-button " onClick={() => addToCart(form.productDetail)}>
                Add to cart
              </div>
            )}
            </Col>
            <Col className="size-col" lg={8} md={8} >
              <InputDropdown
              className="size-dropdown"
                id="selectedSize"
                name="selectedSize"
                value={form.selectedSize}
                onChange={onInputChange}
                list={form.sizeList}
                label="Size"
              />
              </Col>
            </Row>
          </Col>
        </Row>
        {!accessCheck.isSignedIn && (<Popup
          title="Warning"
          content={"Please login first"}
          onClick={() => {
            navigate("/login")
            dispatch(updateFieldState("showModal", true))
          }}
          buttonLabel="Login"
          buttonLabelSecondary=""
          secondButtonReq={false}
        />)}
      </div>
      {accessCheck.isSignedIn && (<Popup
        title="Size Missing"
        content="Please select size first"
        onClick={handleCloseButton}
        buttonLabel="Ok"
      />)}
    </>
  )
}

export default ProductPage
