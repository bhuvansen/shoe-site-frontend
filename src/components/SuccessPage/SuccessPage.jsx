import axios from "axios"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { isAuthenticated } from "../../API/authentication"
import API from "../../backend"
import "./SuccessPage.css"

const SuccessPage = () => {
  const { sessionId } = useParams()
  const { user, token } = isAuthenticated()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    async function successPrequisite(){
      let orderedProduct = JSON.parse(localStorage.getItem("cart")).filter((item) => item.isChecked === true)
      let amount = JSON.parse(localStorage.getItem("amount"))
      let order = []
      for (let i in orderedProduct) {
        let product = await axios.get(`${API}product/${orderedProduct[i]._id}`)
        if (order.length === 0) {
          let obj = {}
          obj._id = orderedProduct[i]._id
          obj.quantity = [
            {
              size: orderedProduct[i].size,
              quantity:
                parseInt(
                  product.data.quantity.filter((item) => parseInt(item.size) === orderedProduct[i].size)[0].quantity
                ) - orderedProduct[i].quantity,
            },
          ]
          order = [obj]
        } else {
          if (order.filter((item) => item._id === orderedProduct[i]._id).length > 0) {
            for (let j in order) {
              if (order[j]._id === orderedProduct[i]._id) {
                order[j].quantity = [
                  ...order[j].quantity,
                  {
                    size: orderedProduct[i].size,
                    quantity:
                      parseInt(
                        product.data.quantity.filter((item) => parseInt(item.size) === orderedProduct[i].size)[0].quantity
                      ) - orderedProduct[i].quantity,
                  },
                ]
              }
            }
          } else {
            let obj = {}
            obj._id = orderedProduct[i]._id
            obj.quantity = [
              {
                size: orderedProduct[i].size,
                quantity:
                  parseInt(
                    product.data.quantity.filter((item) => parseInt(item.size) === orderedProduct[i].size)[0].quantity
                  ) - orderedProduct[i].quantity,
              },
            ]
            order = [...order, obj]
          }
        }
      }
     
      let successCall = await axios.get(`${API}stripe/order/success/${sessionId}`)
      
      if (successCall.status===200){
          let updateStockCall = await  axios.post(`${API}order/updateStock/${user._id}`, JSON.stringify(order), {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          })
          const body = {
            order: { products: orderedProduct, transaction_id: "", amount: amount },
          }
          let createOrderCall = await axios.post(`${API}order/create/${user._id}`, body, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          })
      }

      let checkCart = await axios.get(`${API}user/${user._id}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      if (checkCart.status===200){
        let cartArray = checkCart.data
        for (let i in cartArray) {
          for (let j in orderedProduct) {
            if (cartArray[i]._id === orderedProduct[j]._id && cartArray[i].size === orderedProduct[j].size) {
              cartArray[i].quantity = cartArray[i].quantity - orderedProduct[j].quantity
            }
          }
        }
        cartArray = cartArray.filter((item) => item.quantity !== 0)
        let cartUpdate = await axios.put(`${API}user/${user._id}/cart/update`, cartArray, {
              headers: { Authorization: `Bearer ${token}` },
            })
        if (cartUpdate.status===200){
          localStorage.removeItem("cart")
          localStorage.removeItem("amount")
              navigate("/")
        }
      }

    }
    successPrequisite()
  }, [])

  return (
    <div className="success-page">
      <h1>Hold on! your transaction is successfull. We are creating the order.</h1>
    </div>
  )
}

export default SuccessPage
