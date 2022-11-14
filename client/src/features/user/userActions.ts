import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { HttpStatusCode } from "axios";
import https from "https";
import { FieldValues } from "react-hook-form";
import { User } from "../../@types/User";
import { RootState } from "../../store/Store";

// userAction.js
export const registerUser = createAsyncThunk(
  // action type string
  "user/register",
  // callback function
  async (
    { firstName, lastName, userName, email, pwd }: FieldValues,
    { rejectWithValue }
  ) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // make request to backend
      await axios.post(
        "https://speedrun-coop.onrender.com/users",
        { firstName, lastName, userName, email, pwd },
        config
      );
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password, time_limit }: FieldValues, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://speedrun-coop.onrender.com/login",
        { email, password, time_limit },
        config
      );
      // store user's token in local storage
      localStorage.setItem("userToken", data.token);
      return data;
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserDetails = createAsyncThunk<
  User,
  void,
  { state: RootState }
>("user/getUserDetails", async (_: void, { getState, rejectWithValue }) => {
  try {
    // get user data from store
    const { user }: RootState = getState();
    if (user.userInfo) {
      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.get(
        `https://speedrun-coop.onrender.com/users/${user.userInfo.id}`,
        config
      );
      return data;
    }
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
