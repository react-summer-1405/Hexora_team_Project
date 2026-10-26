import { createSlice } from "@reduxjs/toolkit";
import { removeItem, setItem } from "../../../core/localStorage/localStorage";

const initialState = {
  userId: localStorage.getItem("userId")
    ? Number(localStorage.getItem("userId"))
    : null,
};
const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload

            setItem("userId", action.payload);

        },

        logout: (state) => {

            state.userId = null

        removeItem("userId");

        }
    }
})

export const { setUserId, logout } = authSlice.actions;


export default authSlice.reducer;