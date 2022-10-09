import React , {useEffect }from "react"
import NavbarApp from "../common/Navbar/NavbarApp"
import "./Login.css"
import loginShoe from "../../Asset/loginShoe.svg"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "../common/button/button"
import { useSelector, useDispatch } from "react-redux"
import { updateFieldState } from "../../store/action/form-action"
import { handleNonEmptyFieldCSS } from "../../common/utils"
import axios from "axios"
import { authenticate, isAuthenticated } from "../../API/authentication"
import { useNavigate } from "react-router"
import { isAdmin, isSignedIn } from "../../store/action/access-action"
import API from "../../backend"

const Login = () => {
  const navigate = useNavigate()
  const form = useSelector((state) => state.formReducer)
  const dispatch = useDispatch()

  const onInputChange = (event) => {
    let name = event.target.name
    let value = event.target.value
    dispatch(updateFieldState(name, value))
    handleNonEmptyFieldCSS(event)
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
          console.log("RUNNING NEXT")
          dispatch(updateFieldState("password", ""))
          performRedirect()
          });
      })
      .catch((err) => {
        console.log("err", err.response)
        // let error = {
        //   response: err.response.statusText,
        //   data: err.response.data,
        // }
        // console.log("error", error)
      })
  }

  useEffect(() => {
    handleNonEmptyFieldCSS(null, true)
    performRedirect()
  },[]);


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
          <h1 className="font-weight-400">Login</h1>

          <form className="form-login">
            <div className="input-container mt-5">
              <input
                type="text"
                id="email"
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
                id="password"
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
            <Button Label="Login" onClick={loginUser} />
          </form>
        </Col>
      </Row>
    </>
  )
}

export default Login
