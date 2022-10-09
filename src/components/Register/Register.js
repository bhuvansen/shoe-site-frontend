import React, {useEffect} from "react"
import NavbarApp from "../common/Navbar/NavbarApp"
import "../Login/Login.css"
import loginShoe from "../../Asset/loginShoe.svg"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { useSelector, useDispatch } from "react-redux"
import Button from "../common/button/button"
import { updateFieldState } from "../../store/action/form-action"
import { handleNonEmptyFieldCSS } from "../../common/utils"
import { useNavigate } from "react-router-dom"
import Popup from "../common/Modal/Modal"
import axios from "axios"
import API from "../../backend"

const Register = () => {
  const navigate = useNavigate()
  const form = useSelector((state) => state.formReducer)

  const dispatch = useDispatch()

  const onInputChange = (event) => {
    let name = event.target.name
    let value = event.target.value
    dispatch(updateFieldState(name, value))
    handleNonEmptyFieldCSS(event)
  }

  const createUser = () => {
    axios
      .post(`${API}signup`, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      })
      .then(() => {
        dispatch(updateFieldState("firstName", ""))
        dispatch(updateFieldState("lastName", ""))
        dispatch(updateFieldState("email", ""))
        dispatch(updateFieldState("password", ""))
        dispatch(updateFieldState("showModal", true))
      })
      .catch((err) => {
        console.log("err", err.response)
        let error = {
          response: err.response.statusText,
          data: err.response.data,
        }
        console.log("error", error)
      })
  }

  const handleCloseButton = () => {
    dispatch(updateFieldState("showModal", false))
    navigate("/login")
  }

  useEffect(() => {
    handleNonEmptyFieldCSS(null, true)
  }, []);

  return (
    <>
      <NavbarApp />
      <Row>
        <Col className="shoeCol p-0 shoeBorder" lg={6}>
          <div className="shoeSVG">
            <img src={loginShoe} alt="" />
          </div>
        </Col>
        <Col className="form-side p-0 mt-5" lg={6}>
          <h1 className="font-weight-400">Register</h1>

          <form className="form-login">
            <div className="input-container mt-5">
              <input
                type="text"
                className="text-input"
                placeholder="Enter your text"
                value={form.firstName}
                name="firstName"
                onChange={onInputChange}
              />
              <label htmlFor="name" className="label">
                First Name
              </label>
            </div>
            <div className="input-container mt-5">
              <input
                type="text"
                className="text-input"
                placeholder="Enter your text"
                value={form.lastName}
                name="lastName"
                onChange={onInputChange}
              />
              <label htmlFor="name" className="label">
                Last Name
              </label>
            </div>
            <div className="input-container mt-5">
              <input
                type="text"
                className="text-input"
                placeholder="Enter your text"
                value={form.email}
                name="email"
                onChange={onInputChange}
              />
              <label htmlFor="name" className="label">
                Email
              </label>
            </div>
            <div className="input-container mt-5">
              <input
                type="password"
                className="text-input"
                placeholder="Enter your text"
                value={form.password}
                name="password"
                onChange={onInputChange}
              />
              <label htmlFor="name" className="label">
                Password
              </label>
            </div>
            <Button Label="Register" onClick={createUser} />
          </form>
        </Col>
      </Row>
      <Popup
        title="Customer successfully created"
        content="Click on Sign In button to login"
        onClick={handleCloseButton}
        buttonLabel="Sign In"
      />
    </>
  )
}

export default Register
