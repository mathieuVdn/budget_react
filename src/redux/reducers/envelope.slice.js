import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getRequest, postRequest, putRequest, deleteRequest} from "../../api/api";
import {getItem, setItem} from "../../utils/storage.utils";

export const getEnvelopes = createAsyncThunk("/envelopes", async (user_id, thunkApi) => {
    const {fulfillWithValue, rejectWithValue} = thunkApi;
    const token = getItem("token")
    const {status, result, error} = await getRequest(`/envelopes/${user_id}`);
    console.log(result)
    return error ? rejectWithValue(`Error status ${status} - ${error}`) : fulfillWithValue(result);
});

export const createEnvelope = createAsyncThunk("/envelopes/create", async (form, thunkApi) => {
    const {fulfillWithValue, rejectWithValue} = thunkApi;
    const token = getItem("token")
    const {status, result, error} = await postRequest("/envelopes/create", form,token);
    console.log(result)
    return error ? rejectWithValue(`Cannot sign up - Error status ${status} - ${error}`) : fulfillWithValue(result);
});

export const updateEnvelope = createAsyncThunk("/envelopes/update", async (form, thunkApi) => {
    const {fulfillWithValue, rejectWithValue} = thunkApi;
    const token = getItem("token")
    const {status, result, error} = await putRequest("/envelopes/update", form, token);
    console.log(result)
    return error ? rejectWithValue(`Cannot sign up - Error status ${status} - ${error}`) : fulfillWithValue(result);
});

export const deleteEnvelope = createAsyncThunk("/envelopes/delete", async (envelopeId, thunkApi) => {
    const {fulfillWithValue, rejectWithValue} = thunkApi;
    const token = getItem("token")
    const {status, result, error} = await deleteRequest(`/envelopes/delete/${envelopeId}`,token);
    return error ? rejectWithValue(`Cannot sign up - Error status ${status} - ${error}`) : fulfillWithValue(result);
});

export const envelopeSlice = createSlice({
    name: "envelope",
    initialState: {
        loading: false,
        finish: false,
        newEnvelope: {},
        savings: [],
        selectedEnvelope: {},
        error: ""
    }, reducers: {
        changeName: (state, action) => {
            return {...state, newEnvelope: {...state.newEnvelope, name: action.payload}};
        },

        changeAmount: (state, action) => {
            return {...state, newEnvelope: {...state.newEnvelope, amount: action.payload}};
        },

        handleSelectEnvelope: (state, action) => {
            console.log(action.payload)
             return {...state, selectedEnvelope: action.payload}
            },
        changeNameSelectEnvelope: (state, action) => {
            return {...state, selectedEnvelope: {...state.selectedEnvelope, name: action.payload}};
        },

        changeAmountSelectEnvelope: (state, action) => {
            return {...state, selectedEnvelope: {...state.selectedEnvelope, amount: action.payload}};
        },
    }, extraReducers: (builder) => {
builder
            // GET ENVELOPES
            .addCase(getEnvelopes.fulfilled, (state, action) => {
                return {...state, loading: false, finish: true, savings: [...action.payload.envelopes.result]};
            })
            .addCase(getEnvelopes.rejected, (state) => {
                return {...state, loading: false, finish: false};
            })
            .addCase(getEnvelopes.pending, (state) => {
                return {...state, loading: true, finish: false};
            })

            // CREATE ENVELOPE
            .addCase(createEnvelope.fulfilled, (state, action) => {
                console.log(action.payload)
                return {...state, loading: false, finish: true, savings: [...state.savings, action.payload.envelope]};
            })
            .addCase(createEnvelope.rejected, (state) => {
                return {...state, loading: false, finish: false};
            })
            .addCase(createEnvelope.pending, (state) => {
                return {...state, loading: true, finish: false};
            })

            // DELETE ENVELOPE
            .addCase(deleteEnvelope.fulfilled, (state, action) => {
                console.log(action.payload)
                return {...state, loading: false, finish: true, savings: [...state.savings.filter(elt => elt.id!== parseInt( action.payload.envelope.id))]};
            })
            .addCase(deleteEnvelope.rejected, (state) => {
                return {...state, loading: false, finish: false};
            })
            .addCase(deleteEnvelope.pending, (state) => {
                return {...state, loading: true, finish: false};
            })

            // UPDATE ENVELOPE
            .addCase(updateEnvelope.fulfilled, (state, action) => {
                console.log(action.payload)
                return {...state, loading: false, finish: true, savings: [...state.savings.filter(elt => elt.id!== parseInt( action.payload.envelope.id)), action.payload.envelope]};
            })
            .addCase(updateEnvelope.rejected, (state) => {
                return {...state, loading: false, finish: false};
            })
            .addCase(updateEnvelope.pending, (state) => {
                return {...state, loading: true, finish: false};
            })
    }
});

export const {changeName, changeAmount, handleSelectEnvelope, changeNameSelectEnvelope, changeAmountSelectEnvelope} = envelopeSlice.actions;

export default envelopeSlice.reducer;