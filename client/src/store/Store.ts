import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";

const initialState = {
  reducer: {
    user: userReducer,
  },
};

export const Store = configureStore(initialState);
export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;
