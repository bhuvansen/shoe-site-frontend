import axios from "axios"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import { isAuthenticated } from "../../../API/authentication"
import API from "../../../backend"
import { updateFieldState } from "../../../store/action/form-action"

const ManageCartButton = ({ cartQuantity, className, selectedProduct }) => {
  const location = useLocation()

  const form = useSelector((state) => state.formReducer)
  const dispatch = useDispatch()
  const { user, token } = isAuthenticated()

  const addToCart = (product) => {
    if (
      location.pathname === `/product/${selectedProduct.name.toLowerCase().replace(/[\s]/, "")}/${selectedProduct._id}`
    ) {
      if (form.selectedSize === "") {
        dispatch(updateFieldState("showModal", true))
      } else {
        addAPICall(product)
      }
    } else {
      addAPICall(product)
    }
  }

  const addAPICall = (product) => {
    if (user) {
      axios
        .put(
          `${API}user/${user._id}/cart`,
          {
            _id: product._id,
            name: product.name,
            category: !product.category._id ? product.category : product.category._id,
            price: product.price,
            quantity: 1,
            size: form.selectedSize !== "" ? parseInt(form.selectedSize) : product.size,
          },
          {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          }
        )
        .then((resp) => {
          if (location.pathname === `/cart`) {
            resp.data.forEach((item) => {
              for (let i in form.userCart) {
                if (form.userCart[i]._id === item._id && form.userCart[i].size === item.size) {
                  item.isChecked = form.userCart[i].isChecked
                  break
                }
              }
            })
            dispatch(updateFieldState("userCart", resp.data))
          } else {
            dispatch(updateFieldState("userCart", resp.data))
          }
          if (location.pathname !== `/product/${product.name.toLowerCase().replace(/[\s]/, "")}/${product._id}`) {
            let productArray = form.productsArrayShown.map((prod) => {
              if (prod._id === product._id) {
                prod.cartQuantity = prod.cartQuantity ? prod.cartQuantity + 1 : 1
              }
              return prod
            })
            dispatch(updateFieldState("productsArrayShown", productArray))
          } else {
            let quantity = 0
            resp.data
              .filter((item) => item._id === product._id)
              .forEach((item) => (quantity = quantity + item.quantity))
            dispatch(updateFieldState("quantityInCart", quantity))
          }
        })
    } else {
      dispatch(updateFieldState("showModal", true))
    }
  }

  const removeFromCart = (productId, size) => {
    axios
      .delete(`${API}user/${user._id}/cart/${productId}/${form.selectedSize !== "" ? form.selectedSize : size}`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })
      .then((resp) => {
        let productArray = form.productsArrayShown.map((prod) => {
          if (prod._id === productId) {
            prod.cartQuantity = prod.cartQuantity - 1
          }
          return prod
        })
        if (location.pathname === `/cart`) {
          resp.data.forEach((item) => {
            for (let i in form.userCart) {
              if (form.userCart[i]._id === item._id && form.userCart[i].size === item.size) {
                item.isChecked = form.userCart[i].isChecked
                break
              }
            }
          })
          dispatch(updateFieldState("userCart", resp.data))
        } else {
          dispatch(updateFieldState("userCart", resp.data))
        }
        if (
          location.pathname !==
          `/product/${selectedProduct.name.toLowerCase().replace(/[\s]/, "")}/${selectedProduct._id}`
        ) {
          dispatch(updateFieldState("productsArrayShown", productArray))
        } else {
          let quantity = 0
          if (resp.data.length > 0) {
            resp.data.filter((item) => item._id === productId).forEach((item) => (quantity = quantity + item.quantity))
          }
          dispatch(updateFieldState("quantityInCart", quantity))
        }
      })
  }

  return (
    <span className={`manage-cart-button d-flex justify-content-center ${className}`}>
      <div
        className="manage-cart-button-width"
        onClick={() => removeFromCart(selectedProduct._id, selectedProduct.size)}
      >
        -
      </div>
      <div className="bg-light text-black manage-cart-button-width cursor-default">{cartQuantity}</div>
      <div className="manage-cart-button-width" onClick={() => addToCart(selectedProduct)}>
        +
      </div>
    </span>
  )
}

export default ManageCartButton
