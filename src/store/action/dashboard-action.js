export const updatedashboardState =(name, value)=>({
    type: "UPDATE_DASBOARD_STATE",
    payload: {
        fieldName: name,
        fieldValue: value
    }
})