import { accessReducer } from "./reducer/access-reducer"
import { formReducer, formValidationReducer } from "./reducer/form-reducer"
import { dashboardReducer } from "./reducer/dashboard-reducer"

const rootReducers = {
    accessReducer:accessReducer,
    formReducer:formReducer,
    dashboardReducer:dashboardReducer,
    formValidationReducer:formValidationReducer
}
export default rootReducers