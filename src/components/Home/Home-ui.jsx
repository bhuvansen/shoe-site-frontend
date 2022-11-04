import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { isAuthenticated } from "../../API/authentication"
import API from "../../backend"
import { updateFieldState } from "../../store/action/form-action"
import Popup from "../common/Modal/Modal"
import NavbarApp from "../common/Navbar/NavbarApp"
import Product from "../common/Product/Product"
import { useLocation } from "react-router"
import Banner from "./Banner"

const Home = () => {
  const { categoryId } = useParams()
  const location = useLocation()

  const form = useSelector((state) => state.formReducer)
  const accessReducer = useSelector((state) => state.accessReducer)
  const dispatch = useDispatch()
  const { user, token } = isAuthenticated()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${API}products`).then((product) => {
      dispatch(updateFieldState("productsArray", product.data))
      if(accessReducer.isSignedIn){
        axios
          .get(`${API}user/${user._id}/cart`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((cart) => {
            dispatch(updateFieldState("userCart", cart.data))
            let productArray = JSON.parse(JSON.stringify(product.data))
            if (cart && cart.data && cart.data.length > 0) {
              let cartArray = cart.data
              let matchedProd = []
              for (let i in productArray) {
                matchedProd = cartArray.filter((item) => item._id === productArray[i]._id)
                if (matchedProd.length > 0) {
                  productArray[i].cartQuantity = matchedProd[0].quantity
                }
              }
            }
            dispatch(updateFieldState("productsArrayShown", productArray))
          })
      }else{
        dispatch(updateFieldState("productsArrayShown", product.data))
      }
    })
  }, [])


  const redirectToPrdouct=(name, id)=>{
    name=name.toLowerCase().replace(/[\s]/, "")
    navigate(`/product/${name}/${id}`)
  }

  return (
    <>
      <NavbarApp />
      {
        location.pathname==="/" && (
            <Banner/>
        )
      } 
      {
        location.pathname==="/" ? (
          <h4 className="mt-4 font-weight-600">Available Products</h4>
        ):(<h4 className="mt-4 font-weight-600">Selected Product</h4>)
      } 
      <Product productArray={ categoryId ? form.productsArrayShown.filter(prod=>prod.category._id===categoryId) : form.productsArrayShown}  seeDetails={redirectToPrdouct}/>

        <Popup
          title="Warning"
          content={"Please login first"}
          onClick={() => {
            navigate("/login")
            dispatch(updateFieldState("showModal", true))
          }}
          buttonLabel="Login"
          buttonLabelSecondary=""
          secondButtonReq={false}
        />

        <Popup
          title="Warning"
          content={"Please login first"}
          onClick={() => {
            navigate("/login")
            dispatch(updateFieldState("showModal", true))
          }}
          buttonLabel="Login"
          buttonLabelSecondary=""
          secondButtonReq={false}
        />
        <div className="">
        </div>
    </>
  )
}

export default Home
