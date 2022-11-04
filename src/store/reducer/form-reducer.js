const defaultState={
   firstName:"",
   lastName:"",
   email:"",
   password:"",
   showModal:false,
   categoriesArray:[],
   productsArray:[],
   productsArrayShown:[],
   cartArray:[],
   productDetails:{},
   sizeList:[{}],
   selectedSize:"",
   successOrderBanner:false,
   currentQuantity:"",
   userCart:[],
   selectedProductCategory:""
}

const validationState={
    email:{
        isError: false,
        errorMsg:""
    },
    password:{
        isError: false,
        errorMsg:""
    },
    firstName:{
        isError: false,
        errorMsg:""
    },
    lastName:{
        isError: false,
        errorMsg:""
    }
}

export const formReducer=(state=defaultState, action)=>{
    switch(action.type){
        case "UPDATE_FIELD_STATE":
            return {...state, [action.payload.fieldName] :action.payload.fieldValue}
        default:
            return state
    }
}

export const formValidationReducer=(state=validationState, action)=>{
    switch(action.type){
        case "UPDATE_FIELD_VALIDATION_STATE":
            return {...state, [action.payload.fieldName] :action.payload.fieldError}
        default:
            return state
    }
}