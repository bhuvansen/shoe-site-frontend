const defaultState={
    isAdmin : false,
    isSignedIn: false
}

export const accessReducer=(state=defaultState, action)=>{
    switch(action.type){
        case "IS_ADMIN":
            return {...state, isAdmin :action.payload}
        case "IS_SIGNED_IN":
            return {...state, isSignedIn :action.payload}
        default:
            return state
    }
}