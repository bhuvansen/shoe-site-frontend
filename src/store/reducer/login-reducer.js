import { getActionTypes } from "../../common/ApiConfig";

export const loginReducer =(state={}, action  )=>{
    switch(action.type){
        case getActionTypes("LOGIN_USER").FETCHING:
            return {
                ...state,
                loading: true,
                error: ""
            }
        case getActionTypes("LOGIN_USER").FULLFILLED:
            console.log("FULLFILLED")
            return {
                data: action.payload,
                loading: false,
                error: ""
            }
        case getActionTypes("LOGIN_USER").REJECTED:
            return {
                data: [],
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const signupReducer =(state={}, action  )=>{
    switch(action.type){
        case getActionTypes("SIGNUP_USER").FETCHING:
            return {
                ...state,
                loading: true,
                error: ""
            }
        case getActionTypes("SIGNUP_USER").FULLFILLED:
            console.log("FULLFILLED")
            return {
                data: action.payload,
                loading: false,
                error: ""
            }
        case getActionTypes("SIGNUP_USER").REJECTED:
            return {
                data: [],
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}