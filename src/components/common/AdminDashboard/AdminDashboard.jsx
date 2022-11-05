import axios from "axios"
import React, { useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { isAuthenticated } from "../../../API/authentication"
import API from "../../../backend"
import { updatedashboardState } from "../../../store/action/dashboard-action"
import AdminDashboardCard from "./AdminDashboardCard"

const AdminDashboard = () => {
  const { user, token } = isAuthenticated()
  const dashboardForm = useSelector((state) => state.dashboardReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`${API}orders/${user._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((orders) => {
      console.log(orders)
      dispatch(updatedashboardState("totalOrders", orders.data.length))
      // dispatch(updatedashboardState("pendingOrders", orders.data.fil))
    })
       
  }, [])

  return (
    <>
      <h1 className="mt-5">Admin Dashboard</h1>
      <div className="admin-content">
        <Row className ="mt-2">
          <Col lg={4}>
            <AdminDashboardCard header="Total orders" child={dashboardForm.totalOrders} colorCode = " bg-light" textColor={"text-dark"}/>
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
