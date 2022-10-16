import React from "react"
import { Col, Row } from "react-bootstrap"
import AdminDashboardCard from "./AdminDashboardCard"

const AdminDashboard = () => {
  return (
    <>
      <h1 className="mt-5">Admin Dashboard</h1>
      <div className="admin-content">
        <Row className ="mt-2">
          <Col lg={4}>
            <AdminDashboardCard header="Total orders" child="57" colorCode = " bg-light" textColor={"text-dark"}/>
          </Col>
          <Col lg={4}>
            <AdminDashboardCard header="Completed orders" child="50" colorCode = " bg-success" textColor={"text-white"}/>
          </Col>
          <Col lg={4}>
            <AdminDashboardCard header="Pending orders" child="7" colorCode = " bg-danger" textColor={"text-white"}/>
          </Col>
        </Row>  
        <Row className="mt-4">
          <Col>
            <AdminDashboardCard header="Trending Product" child="Formal" colorCode = " bg-light" textColor={"text-dark"}/>
          </Col>
        </Row>
      </div>
      
    </>
  )
}

export default AdminDashboard
