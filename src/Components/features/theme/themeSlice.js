import { createSlice } from "@reduxjs/toolkit"


const getInitialTheme = () => {
    try {
        const saved = localStorage.getItem("theme")
        if (saved === 'light' || saved === 'dark') return saved;
    } catch { }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

}

const themeSlice = createSlice({
    name: 'theme',
    initialState: { mode: getInitialTheme() },

    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'dark' ? 'light' : 'dark';
        },
            setTheme: (state, action) => {
      state.mode = action.payload; 
    },
    }
})

export const { toggleTheme, setTheme } = themeSlice.actions;
export const selectThemeMode = (state) => state.theme.mode;

export default themeSlice.reducer;