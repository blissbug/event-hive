import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    accessToken: string;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export const authSlice = createSlice({
    name:'auth',
    initialState:{
        accessToken:"",
        isAuthenticated: false,
        isLoading: true,
    },
    reducers:{
        logout:(state)=>{
            state.accessToken="",
            state.isAuthenticated = false,
            state.isLoading=false
        },
        login:(state,accessToken)=>{
            state.accessToken=accessToken.payload,
            state.isAuthenticated = true,
            state.isLoading=false
        },
        refresh:(state,accessToken)=>{
            state.accessToken=accessToken.payload,
            state.isAuthenticated = true;
        },
        setLoading:(state,action: PayloadAction<boolean>)=>{
            state.isLoading=action.payload;
        }
    }
})

export const {logout,login,refresh,setLoading} = authSlice.actions;
export default authSlice.reducer;

