const defaultState={
   firstName:"",
   lastName:"",
   showModal:false,
   categoriesArray:[],
   productsArray:[],
   productsArrayShown:[],
   cartArray:[],
   productDetails:{},
   sizeList:[{}],
   selectedSize:"",
   successOrderBanner:false
}

export const formReducer=(state=defaultState, action)=>{
    switch(action.type){
        case "UPDATE_FIELD_STATE":
            return {...state, [action.payload.fieldName] :action.payload.fieldValue}
        default:
            return state
    }
}