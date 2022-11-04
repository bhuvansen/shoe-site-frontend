import { isAuthenticated } from "./API/authentication"
import "./App.css"
import PageRoutes from "./routes/routes"
import { useDispatch } from "react-redux"
import { isAdmin, isSignedIn } from "./store/action/access-action"
import { useEffect } from "react"
import axios from "axios"
import API from "./backend"
import { updateFieldState } from "./store/action/form-action"
// import Footer from "./components/common/Footer/Footer"

function App() {
  const { user } = isAuthenticated()
  const dispatch = useDispatch()

  if (user) {
    if (user.role === 1) {
      dispatch(isAdmin(true))
      dispatch(isSignedIn(true))
    } else {
      dispatch(isAdmin(false))
      dispatch(isSignedIn(true))
    }
  } else {
    dispatch(isAdmin(false))
    dispatch(isSignedIn(false))
  }

  useEffect(() => {
    axios.get(
      `${API}categories`
    ).then((response)=>{
      dispatch(updateFieldState("categoriesArray", response.data))
    })

    

  }, [])

  

  return (
    <div className="App">
      <PageRoutes />
    </div>
  )
}

export default App
