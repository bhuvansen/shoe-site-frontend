export const updateFieldState =(name, value)=>({
    type: "UPDATE_FIELD_STATE",
    payload: {
        fieldName: name,
        fieldValue: value
    }
})

export const updateFieldValidationState =(name, isError, msg)=>({
    type: "UPDATE_FIELD_VALIDATION_STATE",
    payload: {
        fieldName: name,
        fieldError:{
            isError: isError,
            errorMsg:msg
        }
    }
})