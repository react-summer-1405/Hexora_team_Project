import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../../Components/features/auth/authSlice"
import themeReducer from "../../Components/features/theme/themeSlice"


export const store = configureStore({
    reducer:{
        auth:authReducer,
        theme:themeReducer,
    }
}) 