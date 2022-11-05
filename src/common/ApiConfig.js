import axios from "axios"

export const getActionTypes = (actionKey)=> { 
    return {    
        FETCHING:`${actionKey}_fetching`,
        FULLFILLED: `${actionKey}_fullfilled`,
        REJECTED:`${actionKey}_rejected`,
    }
}

export const parsingErrorObj =(error)=>{
    let returnError 

    if(!(error && error.response)){
        returnError = {
            error: "Please check your Internet connection or try again later"
        }
        return returnError
    }

    if( 
        error.response.data && 
        error.response.data.errors && 
        error.response.data.errors.length>0 && 
        error.response.data.errors[0] !== undefined  
        ){
            returnError = error.response.data
    }else if(error.response.status){
        returnError = {
            error : {
                code: error.status.toString(),
                message: error.response.statusText || error.response.error
            }
        }
    }else{
        console.log("ERROR LAST CASE", error)
    }
    return returnError
}

export const fetchCommon = (endpoint, reqBody, method = "get", headerInput = {}) => async (
    dispatch =()=>{},
    actionKey =""
    ) => {
    if (typeof endpoint !== "string") {
        throw new Error ("Specify a string endpoint URL.")
    }
    const ACTION_TYPES = getActionTypes(actionKey)
    const fullUrl = "http://localhost:8000/api" + endpoint
    let respStatus = ""
    dispatch({ type: ACTION_TYPES.FETCHING })
    try {
        let response = await axios(
            {
                method: method,
                url: fullUrl,
                data: reqBody
            })
            respStatus = response.status
            let responseObj = response.data
            if (response.status!== 200 && response.status !== 422 && response.status !== 500 && response.status !== 204 ) {
                throw responseObj
            }
            dispatch({ type: ACTION_TYPES.FULLFILLED, payload: responseObj, requestURL: fullUrl, actionKey })
            return Promise.resolve(responseObj)
    } catch (error){
        console.log("ERROR", error)
        const responseError = parsingErrorObj(error)
        dispatch({
            type: ACTION_TYPES.REJECTED,
            payload: responseError, 
            requestURL: fullUrl,
        })
        return Promise.reject(responseError)
    }
}