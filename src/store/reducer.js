import { accessReducer } from "./reducer/access-reducer"
import { formReducer, formValidationReducer } from "./reducer/form-reducer"
import { dashboardReducer } from "./reducer/dashboard-reducer"
import { loginReducer, signupReducer } from "./reducer/login-reducer"

const rootReducers = {
    accessReducer:accessReducer,
    formReducer:formReducer,
    dashboardReducer:dashboardReducer,
    formValidationReducer:formValidationReducer,
    loginReducer:loginReducer,
    signupReducer:signupReducer,
}
export default rootReducers