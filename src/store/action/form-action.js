export const updateFieldState =(name, value)=>({
    type: "UPDATE_FIELD_STATE",
    payload: {
        fieldName: name,
        fieldValue: value
    }
})