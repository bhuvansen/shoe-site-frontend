import React from "react"
import { useSelector } from "react-redux"
import API from "../../../backend"
import ManageCartButton from "../button/ManageCartButton"
import "./Product.css"

const ProductCard = ({ onDeleteClick, onCartClick, presentInCart, cartQuantity, seeDetails, item }) => {
  const sideBarState = useSelector((state) => state.dashboardReducer)

  return (
    <>
      <div className="card border-none bg-light">
        <div className="slider-section">
          <div className="slider-up">
            <span
              className="card-button"
              onClick={sideBarState.selectedItem === "adminProducts" ? onDeleteClick : seeDetails}
            >
              {sideBarState.selectedItem === "adminProducts" ? "Edit" : "See Details"}
            </span>
            {sideBarState.selectedItem === "adminProducts" && (
              <span className="card-button" onClick={onDeleteClick}>
                Delete
              </span>
            )}
          </div>
        </div>
        <div className="img-section">
          <img src={`${API}product/photo/${item._id}`} alt="" />
        </div>
        <div className="title-price-tag">
          <span className="m-0 name">{item.name}</span>
          <span className="m-0 price">{`Rs. ${item.price}`}</span>
        </div>
      </div>
    </>
  )
}

export default ProductCard
