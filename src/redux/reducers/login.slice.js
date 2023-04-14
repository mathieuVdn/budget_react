import {postRequest} from "../../api/api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setItem} from "../../utils/storage.utils";


export const signIn = createAsyncThunk("/users/sign-in", async (form, thunkApi) => {
    const {fulfillWithValue, rejectWithValue} = thunkApi;
    const {status, result, error} = await postRequest("/users/sign-in", form);
    console.log(result)
    const token = result.user.token
    setItem("token", token)
    console.log(result.user)
    return error ? rejectWithValue(`Cannot sign in - Error status ${status} - ${error}`) : fulfillWithValue(result);
});


export const loginSlice = createSlice({
    name: "login", initialState: {
        loading: false,
        email: "",
        password: "",
        finish: false,
        persistUser: {},
        errorSignIn: "",
        logged: false,
    }, reducers: {
        changeMail: (state, action) => {
            return {...state, email: action.payload};
        },
        changePassword: (state, action) => {
            return {...state, password: action.payload};
        },
        logout: (state) => {
            return {...state, logged: false, finish: false, email : "", password : ""};
        },
        updatePersistUser: (state, action) => {
            return {...state, persistUser: action.payload};
        }

    }, extraReducers: (builder) => {
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                return {...state, loading: false, finish: true, logged: true, persistUser: action.payload.user};
            })
            .addCase(signIn.rejected, (state, action) => {
                return {...state, loading: false, finish: false, errorSignIn: action.payload};
            })
            .addCase(signIn.pending, (state, action) => {
                return {...state, loading: true, finish: false};
            });
    }
});

export const {changeMail, changePassword, logout, updatePersistUser} = loginSlice.actions;

export default loginSlice.reducer;