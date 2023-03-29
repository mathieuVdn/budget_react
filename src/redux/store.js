import {configureStore} from "@reduxjs/toolkit";
import loginModalSlice from "./reducers/loginModal.slice";
import login from "./reducers/login.slice";
import signup from "./reducers/signup.slice";
import  user from "./reducers/user.slice";

export const store = configureStore({
    reducer: {
        loginModalSlice,
        login,
        signup,
        user,
    }
})
