import React, {useEffect, useState} from "react"
import NavbarApp from "../common/Navbar/NavbarApp"
import "../Login/Login.css"
import loginShoe from "../../Asset/loginShoe.svg"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { useSelector, useDispatch } from "react-redux"
import Button from "../common/button/button"
import { updateFieldState, updateFieldValidationState } from "../../store/action/form-action"
import { handleNonEmptyFieldCSS } from "../../common/utils"
import { useNavigate } from "react-router-dom"
import Popup from "../common/Modal/Modal"
import axios from "axios"
import API from "../../backend"
import InputText from "../common/Input-Fields/InputText"

const Register = () => {
  const navigate = useNavigate()
  const form = useSelector((state) => state.formReducer)
  const validationForm = useSelector((state) => state.formValidationReducer)

  const dispatch = useDispatch()

  const [disableState, setDisableState] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)

  const onInputChange = (event) => {
    let name = event.target.name
    let value = event.target.value
    dispatch(updateFieldState(name, value))
    handleNonEmptyFieldCSS(event)
    if ((name === "email" || name === "firstName" || name === "password") && value.length === 0){
      dispatch(updateFieldValidationState(name, true, "Field cannot be empty"))
    }else{
      let regex
      switch(name){
        case "email":
          regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/i
          if (!regex.test(value)){
            dispatch(updateFieldValidationState(name, true, "Please enter correct email address"))
          }else{
            dispatch(updateFieldValidationState(name, false, ""))
          }
          break
        case "password":
          regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^\&*\)\(+=._-])[!-~]{6,}$/
          if (!regex.test(value)){
            dispatch(updateFieldValidationState(name, true, "Password should be combination of Uppercase, lowercase, digits and special characters"))
          }else{
            dispatch(updateFieldValidationState(name, false, ""))
          }
          break
        case "firstName":
          if (value.length<3){
            dispatch(updateFieldValidationState(name, true, "First Name should be atleast 3 characters long"))
          }else{
            dispatch(updateFieldValidationState(name, false, ""))
          }
      }
    }
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
    checkCompletionState()
  }, [])

  useEffect(() => {
    checkCompletionState()
  }, [validationForm])

  const checkErrorState=()=>{
    if (validationForm.firstName.isError || validationForm.email.isError || validationForm.password.isError){
      return true
    }else{
      return false
    }
  }

  const checkCompletionState=()=>{
    const checkError = checkErrorState()
    if (checkError){
      setDisableState(true)
    }else{
      if(form.firstName ==="" || form.password==="" || form.email===""){
        setDisableState(true)
      }else{
        setDisableState(false)
      }
    }
  }

  const onEyeClick=()=>{
    document.querySelectorAll(".text-input").forEach((element) => {
      console.log("element", element)
        if (element.id === "password") {
          console.log("elemrnt", element)
            if(element.type==="password"){
              element.type="text"
              setHidePassword(false)
            }else {
              element.type="password"
              setHidePassword(true)
          }
        } 
    })
  }

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
            <InputText
              id="firstName"
              value={form.firstName}
              name="firstName"
              onChange={onInputChange}
              label="First Name*"
              isError={validationForm.firstName.isError}
              errorMsg={validationForm.firstName.errorMsg}
            />
            <InputText
              id="lastName"
              value={form.lastName}
              name="lastName"
              onChange={onInputChange}
              label="Last Name"
            />
            <InputText
              id="email"
              value={form.email}
              name="email"
              onChange={onInputChange}
              label="Email*"
              isError={validationForm.email.isError}
              errorMsg={validationForm.email.errorMsg}
            />
              <InputText
                type="password"
                id="password"
                value={form.password}
                name="password"
                onChange={onInputChange}
                label="Password*"
                isError={validationForm.password.isError}
                errorMsg={validationForm.password.errorMsg}
                fieldType="password"
                eyeClick={onEyeClick}
                hidePassword={hidePassword}
              />
            <Button Label="Register" onClick={createUser} disabled={disableState}/>
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
