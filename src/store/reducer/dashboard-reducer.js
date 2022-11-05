const defaultState={
    selectedItem:"",
    existingCategories:[],
    existingProducts:[],
    formData:{},
    newProductName:"",
    newProductDesc:"",
    newProductPrice:"",
    newProductQuantity:[{}],
    newProductCategory:"",
    newProductImage:"",
    totalOrders:"",
    pendingOrders:"",
    completedOrders:""
}

export const dashboardReducer=(state=defaultState, action)=>{
    switch(action.type){
        case "UPDATE_DASBOARD_STATE":
            return {...state, [action.payload.fieldName] :action.payload.fieldValue}
        default:
            return state
    }
}

