import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    authReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export default store;