import {postRequest} from "../../api/api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setItem} from "../../utils/storage.utils";


export const signIn = createAsyncThunk("/users/sign-in", async (form, thunkApi) => {
    const {fulfillWithValue, rejectWithValue} = thunkApi;
    const {status, result, error} = await postRequest("/users/sign-in", form);
    console.log(result)
    const token = result.user.token
    setItem("token", token)
    const user_id = result.user.id
    setItem("user_id", user_id)
    return error ? rejectWithValue(`Cannot sign in - Error status ${status} - ${error}`) : fulfillWithValue(result);
});


export const loginSlice = createSlice({
    name: "login", initialState: {
        loading: false,
        email: "",
        password: "",
        finish: false,
        user: [],
        error: "",
        token: false
    }, reducers: {
        changeMail: (state, action) => {
            return {...state, email: action.payload};
        },
        changePassword: (state, action) => {
            return {...state, password: action.payload};
        },
        logout: (state) => {
            return {...state, token: false, finish: false, email : "", password : ""};
        }

    }, extraReducers: (builder) => {
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                return {...state, loading: false, finish: true, token: true};
            })
            .addCase(signIn.rejected, (state, action) => {
                return {...state, loading: false, finish: false, error: action.payload || "Something went wrong"};
            })
            .addCase(signIn.pending, (state, action) => {
                return {...state, loading: true, finish: false};
            });
    }
});

export const {changeMail, changePassword, logout} = loginSlice.actions;

export default loginSlice.reducer;