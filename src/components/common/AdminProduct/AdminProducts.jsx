import axios from "axios"
import React, { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { isAuthenticated } from "../../../API/authentication"
import API from "../../../backend"
import { handleNonEmptyFieldCSS } from "../../../common/utils"
import { updatedashboardState } from "../../../store/action/dashboard-action"
import { updateFieldState } from "../../../store/action/form-action"
import Button from "../button/button"
import InputDropdown from "../Input-Fields/InputDropdown"
import InputText from "../Input-Fields/InputText"
import Popup from "../Modal/Modal"
import Product from "../Product/Product"
import "./AdminProduct.css"
import * as RiIcons from "react-icons/ri"



const AdminProducts = () => {
  const size = [
    { name: 5, _id: 5 },
    { name: 6, _id: 6 },
    { name: 7, _id: 7 },
    { name: 8, _id: 8 },
    { name: 9, _id: 9 },
    { name: 10, _id: 10 },
    { name: 11, _id: 11 },
    { name: 12, _id: 12 },
  ]
  const [addProductVisible, setAddProductVisible] = useState(false)
  const [successfullCreation, setSuccessfullCreation] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [selectedProdforDelete, setSelectedProdforDelete] = useState()

  const dashboardForm = { ...useSelector((state) => state.dashboardReducer) }
  const dispatch = useDispatch()

  const { user, token } = isAuthenticated()

  const enableAddProduct = () => {
    setAddProductVisible(true)
  }

  const onInputChange = (event) => {
    const name = event.target.name
    const value = name === "newProductImage" ? event.target.files[0] : event.target.value
    dispatch(updatedashboardState(name, value))
    handleNonEmptyFieldCSS(event)
  }

  useEffect(() => {
    axios.get(`${API}categories`).then((response) => {
      dispatch(updatedashboardState("existingCategories", response.data))
    })
    axios.get(`${API}products`).then((response) => {
      dispatch(updatedashboardState("existingProducts", response.data))
    })
  }, [])
  useEffect(() => {
    handleNonEmptyFieldCSS(null, true)
  }, [addProductVisible])

  const createProduct = () => {
    let formData = new FormData()
    formData.set("name", dashboardForm.newProductName)
    formData.set("description", dashboardForm.newProductDesc)
    formData.set("price", dashboardForm.newProductPrice)
    formData.set(
      "quantity",JSON.stringify(dashboardForm.newProductQuantity)
    )
    formData.set("category", dashboardForm.newProductCategory)
    formData.set("photo", dashboardForm.newProductImage)

    axios
      .post(`${API}product/create/${user._id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })
      .then((data) => {
        dispatch(updateFieldState("showModal", true))
        setSuccessfullCreation(true)
        dispatch(updatedashboardState("existingProducts", [data.data.product, ...dashboardForm.existingProducts]))
        emptyField()
      })
      .catch((err) => console.log(err))
  }

  const emptyField = () => {
    dispatch(updatedashboardState("newProductName", ""))
    dispatch(updatedashboardState("newProductDesc", ""))
    dispatch(updatedashboardState("newProductPrice", ""))
    dispatch(updatedashboardState("newProductQuantity", [{}]))
    dispatch(updatedashboardState("newProductCategory", ""))
    dispatch(updatedashboardState("newProductImage", ""))
  }

  const deleteProduct = () => {
    axios
      .delete(`${API}product/${selectedProdforDelete[1]}/${user._id}`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })
      .then(() => {
        dispatch(
          updatedashboardState(
            "existingProducts",
            dashboardForm.existingProducts.filter((data) => data._id !== selectedProdforDelete[1])
          )
        )
        setConfirmDelete(false)
        dispatch(updateFieldState("showModal", true))
        setSelectedProdforDelete("")
      })
  }

  const deleteConfirmation = (name, id) => {
    setConfirmDelete(true)
    setSelectedProdforDelete([name, id])
    dispatch(updateFieldState("showModal", true))
  }

  const handleSizeQuantity = (event, index) => {
    const name = event.target.name
    const value = event.target.value
    let sizeQuantArray = dashboardForm.newProductQuantity
    sizeQuantArray[index][name] = value
    dispatch(updatedashboardState("newProductQuantity", sizeQuantArray))
    handleNonEmptyFieldCSS(event)
  }

  const addMoreRow = () => {
    dispatch(updatedashboardState("newProductQuantity", [...dashboardForm.newProductQuantity, {}]))
  }

  const closeNewRow=(index)=>{
    let quantitySizeArray = dashboardForm.newProductQuantity
    quantitySizeArray.splice(index, 1)
    dispatch(updatedashboardState("newProductQuantity",quantitySizeArray))
  }

  return (
    <>
      <div className="mt-5">
        <h1>Products</h1>
        {!addProductVisible && <Button Label="Add New Product" onClick={enableAddProduct}></Button>}
      </div>
      {addProductVisible && (
        <form className="form-login">
          <InputText
            id="newProductName"
            value={dashboardForm.newProductName}
            name="newProductName"
            onChange={onInputChange}
            label="Product Name"
          />
          <InputText
            id="newProductDesc"
            value={dashboardForm.newProductDesc}
            name="newProductDesc"
            onChange={onInputChange}
            label="Product Description"
          />
          <InputText
            id="newProductPrice"
            value={dashboardForm.newProductPrice}
            name="newProductPrice"
            onChange={onInputChange}
            label="Product Price"
          />
          <div id="size-quant-section">
          {dashboardForm.newProductQuantity &&
            dashboardForm.newProductQuantity.map((item, index) => {
              return (
                <div key={index}>
                  <div className="quantity-size">
                    <InputDropdown
                      id="size"
                      name="size"
                      value={item.size}
                      onChange={(event) => handleSizeQuantity(event, index)}
                      list={size}
                      label="Product Size"
                      className={"width-100 left-0"}
                    />
                    <InputText
                      id="quantity"
                      value={item.quantity}
                      name="quantity"
                      onChange={(event) => handleSizeQuantity(event, index)}
                      label="Product Quantity"
                      className={"width-100 left-0"}
                    />
                    <span className="add-button-quantity" onClick={addMoreRow}>
                      Add More
                    </span>
                    {index !==0 && 
                    (<div className="close-icon" >
                      <RiIcons.RiCloseCircleLine onClick={()=>closeNewRow(index)}/>
                    </div>)}
                  </div>
                </div>
              )
            })}
            </div>
          <InputDropdown
            id="newProductCategory"
            name="newProductCategory"
            value={dashboardForm.newProductCategory}
            onChange={onInputChange}
            list={dashboardForm.existingCategories}
            label="Product Category"
          />
          <div className="input-container mt-5">
            <input
              onChange={onInputChange}
              type="file"
              name="newProductImage"
              accept="image"
              placeholder="choose a file"
            />
          </div>
          <Button Label="Add" onClick={createProduct} />
          <Button
            Label="Cancel"
            onClick={() => {
              setAddProductVisible(false)
              emptyField()
            }}
          />
        </form>
      )}
      {successfullCreation && (
        <Popup
          title="Category created succesfully"
          content=""
          onClick={() => setSuccessfullCreation(false)}
          buttonLabel="OK"
          secondButtonReq={false}
        />
      )}
      <Product productArray={dashboardForm.existingProducts} deleteConfirmation={deleteConfirmation} />
      {confirmDelete && (
        <Popup
          title="Warning"
          content={`Are you sure you want to delete ${selectedProdforDelete[0]}`}
          onClick={deleteProduct}
          buttonLabel="Confirm"
          buttonLabelSecondary="No"
          secondButtonReq={true}
          secondButtonAction={() => {
            setConfirmDelete(false)
            dispatch(updateFieldState("showModal", false))
            setSelectedProdforDelete("")
          }}
        />
      )}
    </>
  )
}

export default AdminProducts
