import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../../api/api";
import { setItem } from "../../utils/storage.utils";

export const signUp = createAsyncThunk(
  "/users/sign-up",
  async (form, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const { status, result, error } = await postRequest("/users/sign-up", form);
    console.log(result);
    const token = result.user.token;
    setItem("token", token);
    console.log(result);
    return error
      ? rejectWithValue(`Cannot sign up - Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState: {
    loading: false,
    name: "",
    firstname: "",
    email: "",
    password: "",
    finish: false,
    user: [],
    error: "",
  },
  reducers: {
    changeMail: (state, action) => {
      return { ...state, email: action.payload };
    },
    changePassword: (state, action) => {
      return { ...state, password: action.payload };
    },
    changeName: (state, action) => {

      return { ...state, name: action.payload };
    },
    changeFirstname: (state, action) => {
      return { ...state, firstname: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state) => {
        return { ...state, loading: false, finish: true };
      })
      .addCase(signUp.rejected, (state) => {
        return { ...state, loading: false, finish: false };
      })
      .addCase(signUp.pending, (state) => {
        return { ...state, loading: true, finish: false };
      });
  },
});

export const { changeMail, changePassword, changeName, changeFirstname } =
  signupSlice.actions;

export default signupSlice.reducer;
