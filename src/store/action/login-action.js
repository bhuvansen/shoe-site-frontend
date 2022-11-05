import {fetchCommon} from "../../common/ApiConfig"

export const login = (email, password)=>(dispatch)=>{
  let reqBody = {
      email: email,
      password: password,
    }
  return fetchCommon("/signin", reqBody, "post")(dispatch, "LOGIN_USER")
}

export const signup = (firstName, lastName, email, password) => (dispatch)=>{
  let reqBody = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  }
  return fetchCommon("/signup", reqBody, "post")(dispatch, "SIGNUP_USER")
}