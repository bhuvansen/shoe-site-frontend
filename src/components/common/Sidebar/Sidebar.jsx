import React, { useEffect, useState } from "react"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { SidebarData } from "./SidebarData"
import "./Sidebar.css"
import { updatedashboardState } from "../../../store/action/dashboard-action"
import { useDispatch, useSelector } from "react-redux"

const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sideBarState = useSelector((state) => state.dashboardReducer)
  const [sidebar, setSidebar] = useState(true)

  const showSidebar = () => {
    setSidebar(!sidebar)
  }

  const shiftTabTo = (id, name) => {
    if (name === "") {
      dispatch(updatedashboardState("selectedItem", ""))
      navigate("/")
    } else {
      dispatch(updatedashboardState("selectedItem", name))
      let target = document.getElementById(id)
      document.querySelectorAll(".nav-text").forEach((element) => {
        if (parseInt(element.id) === id) {
          target.classList.add("activatedSideItem")
        } else {
          element.classList.remove("activatedSideItem")
        }
      })
    }
  }

  useEffect(() => {
    document.querySelectorAll(".nav-text").forEach((element) => {
      if (parseInt(element.id) === 1) {
        element.classList.add("activatedSideItem")
      }
    })
  }, [])

  return (
    <>
      {!sidebar && (
        <div className="threeBarIcon bg-light">
          <FaIcons.FaBars onClick={showSidebar} />
        </div>
      )}
      <nav className={sidebar ? "nav-menu active bg-light" : "nav-menu bg-light"}>
        <ul className="nav-menu-items">
          <div className="navbar-toggle bg-light" onClick={showSidebar}>
            <AiIcons.AiOutlineClose />
          </div>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} id={item.id} className="nav-text" onClick={() => shiftTabTo(item.id, item.path)}>
                {item.icon}
                <span>{item.title}</span>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

export default Sidebar
