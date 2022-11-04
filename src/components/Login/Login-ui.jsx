import React , {useEffect, useState }from "react"
import NavbarApp from "../common/Navbar/NavbarApp"
import "./Login.css"
import loginShoe from "../../Asset/loginShoe.svg"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "../common/button/button"
import { useSelector, useDispatch } from "react-redux"
import { updateFieldState, updateFieldValidationState } from "../../store/action/form-action"
import { handleNonEmptyFieldCSS } from "../../common/utils"
import axios from "axios"
import { authenticate, isAuthenticated } from "../../API/authentication"
import { useNavigate } from "react-router"
import { isAdmin, isSignedIn } from "../../store/action/access-action"
import API from "../../backend"
import InputText from "../common/Input-Fields/InputText"

const Login = () => {
  const navigate = useNavigate()
  const form = useSelector((state) => state.formReducer)
  const validationForm = useSelector((state) => state.formValidationReducer)

  const dispatch = useDispatch()

  const [hidePassword, setHidePassword] = useState(true)
  const [disableState, setDisableState] = useState(false)

  const onInputChange = (event) => {
    let name = event.target.name
    let value = event.target.value
    dispatch(updateFieldState(name, value))
    handleNonEmptyFieldCSS(event)
    if ((name === "email" || name === "password") && value.length === 0){
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
      }
    }
  }

  const loginUser = () => {
    axios
      .post(`${API}signin`, {
        email: form.email,
        password: form.password,
      }).then((response) => {
        let data = response.data
        authenticate(data, () => {
          dispatch(updateFieldState("email", ""))
          dispatch(updateFieldState("password", ""))
          performRedirect()
          });
      })
      .catch((err) => {
        console.log("err", err.response)
      })
  }

  useEffect(() => {
    handleNonEmptyFieldCSS(null, true)
    performRedirect()
    checkCompletionState()
  },[])

  useEffect(() => {
    checkCompletionState()
  }, [validationForm])

  const performRedirect = () => {
    const { user } = isAuthenticated();
    if(user){
      if (user && user.role === 1) {
        dispatch(isAdmin(true))
        dispatch(isSignedIn(true))
        navigate("/admin/dashboard")
      } else {
        dispatch(isAdmin(false))
        dispatch(isSignedIn(true))
        navigate("/")
      }
    }else{
        dispatch(isAdmin(false))
        dispatch(isSignedIn(false))
    }
  }

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
      if(form.password==="" || form.email===""){
        setDisableState(true)
      }else{
        setDisableState(false)
      }
    }
  }

  const onEyeClick=()=>{
    document.querySelectorAll(".text-input").forEach((element) => {
        if (element.id === "password") {
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
      <Row className="mb-5">
        <Col className="shoeCol p-0 shoeBorder" lg={6}>
          <div className="shoeSVG">
            <img src={loginShoe} alt="" />
          </div>
        </Col>
        <Col className="form-side p-0 mt-5" lg={6}>
          <h1 className="font-weight-400">Login</h1>

          <form className="form-login">
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
            <Button Label="Login" onClick={loginUser}  disabled={disableState}/>
          </form>
        </Col>
      </Row>
    </>
  )
}

export default Login
