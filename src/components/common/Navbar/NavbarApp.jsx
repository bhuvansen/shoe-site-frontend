import React, { useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./NavbarApp.css"
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { isAdmin, isSignedIn } from '../../../store/action/access-action';
import { updateFieldState } from '../../../store/action/form-action';
import cartIcon from "../../../Asset/cartIcon.svg"
import { updatedashboardState } from '../../../store/action/dashboard-action';
import API from '../../../backend';
import { isAuthenticated } from '../../../API/authentication';

const NavbarApp = () => {
  const { user, token } = isAuthenticated()

  const location = useLocation()
  const navigate = useNavigate()
  const currenTab = (path) => {
    if (location.pathname === path) {
      return { color: "#000000", opacity: "1" };
    } else {
      return { color: "#000000", opacity: "0.5" };
    }
  };
  const accessCheck = useSelector((state) => state.accessReducer)
  const form = useSelector((state) => state.formReducer)
  const dispatch = useDispatch()
  
  const logOutUser=()=>{
    if (typeof window != "undefined") {
      axios.get(`${API}signout`)
      .then((response) =>{
        localStorage.removeItem("jwt")
        dispatch(isAdmin(false))
        dispatch(isSignedIn(false))
        navigate('/')
      })
      .catch((err) => console.log(err))
    }
  }
  const dashboardHandle=()=>{
    dispatch(updatedashboardState("selectedItem", "adminDashboard"))
  }

  const numberOfItems = (cart) => {
    console.log("cart", cart)
    let quantity = 0
    if(cart){
      if ( cart.length > 0) {
        cart.forEach((item) => {
          quantity = quantity + item.quantity 
        })
      }
    }
    return quantity
  }

  useEffect(() => {
    axios
    .get(`${API}user/${user._id}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((cart) => {
      let cartArray = cart.data
      dispatch(updateFieldState("currentQuantity", numberOfItems(cartArray)))
    })
  }, [])

  return (
    <>
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="logo">Shoe Site</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'  >
          <Nav className = "navbuttons">
            <Nav.Link as={Link} to="/" className={"navNames"} style={currenTab("/")}>Home</Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown" className="navNames boder-dropdown">
            {form.categoriesArray.map((category, index)=>{
              return (
                <NavDropdown.Item key={index} href="#action/1">{category.name}</NavDropdown.Item>
              )
            })}
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link as={Link} to="/contact" className={"navNames"}  style={currenTab("/contact")}>Contact</Nav.Link>
            {!accessCheck.isSignedIn ? (
            <Nav.Link as={Link} to="/login" className={"navNames"} style={currenTab("/login")} >Login</Nav.Link>) : (
              <span className="navNames nav-link cursorPointer" style={currenTab("/logout")} onClick={logOutUser} >Logout</span>
              )}
            {!accessCheck.isSignedIn && (
            <Nav.Link as={Link} to="/register" className={"navNames"} style={currenTab("/register")} >Register</Nav.Link>)}
            {accessCheck.isSignedIn && accessCheck.isAdmin && (
            <Nav.Link as={Link} to="/admin/dashboard" className={"navNames"} style={currenTab("/admin/dashboard")} onClick={dashboardHandle} >Dashboard</Nav.Link>)}
            {accessCheck.isSignedIn && (
              <div className='cartLogo position-relative' style={currenTab("/cart")} onClick={()=>navigate("/cart")}>
                <img src={cartIcon} alt=""/>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ml-0">
                  {form.currentQuantity}
                </span>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

    </Navbar>
    </>
    )
}

export default NavbarApp