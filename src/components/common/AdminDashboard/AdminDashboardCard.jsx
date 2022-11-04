import React from "react"
import "./AdminDashboard.css"
const AdminDashboardCard = ({ header, child, colorCode, textColor }) => {
  return (
    <>
      <div className={"card border-none" + colorCode}>
        <h5 className={textColor} >
          {header}
        </h5>
        <div  >
          <span className={textColor} >{child}</span>
        </div>
      </div>
    </>
  )
}

export default AdminDashboardCard
