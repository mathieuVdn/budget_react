import {createSlice, isAllOf} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getRequest, putRequest} from '../../api/api';
import {getItem} from '../../utils/storage.utils';
import LoginBtn from "../../components/button/loginBtn/LoginBtn";

export const getUser = createAsyncThunk('/users', async (userid, thunkApi) => {
    const {fulfillWithValue, rejectWithValue} = thunkApi;
    const token = getItem("token")
    const {status, result, error} = await getRequest(`/users/${userid}`, token);
    return error ? rejectWithValue(`Cannot get user - Error status ${status} - ${error}`) : fulfillWithValue(result);
});

export const updateUser = createAsyncThunk('/users', async (form, thunkApi) => {
    const {fulfillWithValue, rejectWithValue} = thunkApi;
    const userid = getItem("user_id")
    const token = getItem("token")
    const {status, result, error} = await putRequest(`/users/${userid}`, form, token);
    console.log(result)
    return error ? rejectWithValue(`Cannot get user - Error status ${status} - ${error}`) : fulfillWithValue(result);
});

export const getUserSlice = createSlice({
    name: 'user',
    initialState: {
        user:  {},
        loading: false,
        error: null,
    },
    reducers: {
        updateUserName: (state, action) => {
            return {...state, user: {...state.user, name: action.payload}};
        },
        updateUserFirstName: (state, action) => {
            return {...state, user: {...state.user, firstname: action.payload}};
        },
        updateUserEmail: (state, action) => {
            return {...state, user: {...state.user, email: action.payload}};
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                console.log(action.payload)
                return {...state, loading: false, user: {...action.payload}};
            })
            .addCase(getUser.rejected, (state, action) => {
                return {...state, loading: false, error: action.payload};
            })
            .addCase(getUser.pending, (state, action) => {
                return {...state, loading: true};
            });
    }
});

export const {updateUserName, updateUserFirstName, updateUserEmail} = getUserSlice.actions;

export default getUserSlice.reducer;

