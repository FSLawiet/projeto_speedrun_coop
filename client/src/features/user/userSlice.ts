// features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../@types/User";
import { registerUser, userLogin, getUserDetails } from "./userActions";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

export interface IState {
  loading: boolean;
  userInfo: User | undefined;
  userToken: string | null;
  error: any;
  success: boolean;
}

const initialState: IState = {
  loading: false,
  userInfo: undefined, // for user object
  userToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login user
    builder.addCase(userLogin.pending, (state: IState) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state: IState, { payload }) => {
      state.loading = false;
      state.userInfo = payload.userInfo as User;
      state.userToken = payload.userToken;
    });
    builder.addCase(userLogin.rejected, (state: IState, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // register user
    builder.addCase(registerUser.pending, (state: IState) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state: IState) => {
      state.loading = false;
      state.success = true; // registration successful
    });
    builder.addCase(registerUser.rejected, (state: IState, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //user details reducer
    builder.addCase(getUserDetails.pending, (state: IState) => {
      state.loading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state: IState, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    });
    builder.addCase(getUserDetails.rejected, (state: IState, { payload }) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
