import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userSlice"
import themeReducer from "./features/themeSlice"

const store = configureStore({
    reducer:{
        user:userReducer,
        theme:themeReducer
    }
})

export default store