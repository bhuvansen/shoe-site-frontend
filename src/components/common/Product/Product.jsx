import React from "react"
import { Col, Row } from "react-bootstrap"
import ProductCard from "./ProductCard"
import "./Product.css"
import API from "../../../backend"

const Product = ({ productArray , addToCart, deleteConfirmation, removeFromCart, seeDetails}) => {

  return (
    <>
      <Row className="prl-20 d-flex justify justify-content-center">
        {productArray.map((item) => {
          return (
            <Col key={item._id} className="m-20" lg={3}>
              <ProductCard
                presentInCart={item.cartQuantity ? item.cartQuantity>0 ? true : false : false}
                cartQuantity={item.cartQuantity ? item.cartQuantity : ""}
                item={item}
                seeDetails={()=>seeDetails(item.name, item._id)}
                onDeleteClick={()=>deleteConfirmation(item.name, item._id)}
              />
            </Col>
          )
        })}
      </Row>
      
    </>
  )
}

export default Product
