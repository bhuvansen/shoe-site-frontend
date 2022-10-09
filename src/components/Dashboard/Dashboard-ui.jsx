import React, { useEffect } from "react"
import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import { useDispatch, useSelector } from "react-redux"
import AdminCategories from "../common/AdminCategories/AdminCategories"
import AdminProducts from "../common/AdminProduct/AdminProducts"
import NavbarApp from "../common/Navbar/NavbarApp"
import Sidebar from "../common/Sidebar/Sidebar"
import "./Dashboard.css"
const Dashboard = () => {
  const accessCheck = useSelector((state) => state.dashboardReducer)

  return (
    <>
      {/* <Row>
        <Col >
      <Sidebar/>
      </Col>
      <Col >
      <AdminCategories/>
        </Col>
        </Row> */}
      <div className="dashboardPage">
      {/* <div className="mt-0"> */}
        <Sidebar />
        {/* </div> */}
        <div className="main-dashboard-content">
          {accessCheck.selectedItem === "adminCategories" && <AdminCategories />}
          {accessCheck.selectedItem === "adminProducts" && <AdminProducts />}
        </div>
      </div>
    </>
  )
}

export default Dashboard
