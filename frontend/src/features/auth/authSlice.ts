import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:'auth',
    initialState:{
        value:"logged out"
    },
    reducers:{
        logout:(state)=>{
            state.value="logged out"
        },
        login:(state)=>{
            state.value="logged in"
        },
    }
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;
