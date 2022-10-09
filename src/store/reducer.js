import { accessReducer } from "./reducer/access-reducer"
import { formReducer } from "./reducer/form-reducer"
import { dashboardReducer } from "./reducer/dashboard-reducer"

const rootReducers = {
    accessReducer:accessReducer,
    formReducer:formReducer,
    dashboardReducer:dashboardReducer
}
export default rootReducers