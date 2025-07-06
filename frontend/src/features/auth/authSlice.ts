import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:'auth',
    initialState:{
        value:"logged in"
    },
    reducers:{
        logout:(state)=>{
            state.value="logged out"
        }
    }
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;
