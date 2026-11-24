import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../../Components/features/auth/authSlice"
import themeReducer from "../../Components/features/theme/themeSlice"
import notificationReducer from "../../Components/features/notification/notificationSlice"


export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        notification: notificationReducer,

    }
}) 