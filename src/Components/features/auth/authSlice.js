import { createSlice } from "@reduxjs/toolkit";
import { removeItem, setItem } from "../../../core/localStorage/localStorage";

const initialState = {
  userId: localStorage.getItem("userId")
    ? Number(localStorage.getItem("userId"))
    : null,
      profileImage: localStorage.getItem("profileImage") || null,

};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload

            setItem("userId", action.payload);

        },

            setProfileImage: (state, action) => {
      state.profileImage = action.payload;
      setItem("profileImage", action.payload);
    },

    logout: (state) => {
      state.userId = null;
      state.profileImage = null;

      removeItem("userId");
      removeItem("profileImage");
    },
    }
})

export const { setUserId,setProfileImage, logout } = authSlice.actions;


export default authSlice.reducer;