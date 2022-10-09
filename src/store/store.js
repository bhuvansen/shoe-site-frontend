import { configureStore } from "@reduxjs/toolkit";
import  rootReducers  from "./reducer";
// import logger from 'redux-logger'


// const customizedMiddleware = getDefaultMiddleware({
//     serializableCheck: false
//   }) 
const store =  configureStore({
    reducer:rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
          })
})
export default store