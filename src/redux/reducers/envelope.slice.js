import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "../../api/api";
import { getItem, setItem } from "../../utils/storage.utils";
import {
  TYPE_SAVINGS,
  TYPE_EXPENSES,
  TYPE_CHALLENGES,
} from "../../constants/constant.utils.js";
import { sort } from "../../utils/sort.utils";

export const getEnvelopes = createAsyncThunk(
  "/envelopes",
  async (user_id, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, result, error } = await getRequest(`/envelopes/${user_id}`);
    return error
      ? rejectWithValue(`Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  }
);

export const createEnvelope = createAsyncThunk(
  "/envelopes/create",
  async (form, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, result, error } = await postRequest(
      "/envelopes/create",
      form,
      token
    );
    return error
      ? rejectWithValue(`Cannot sign up - Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  }
);

export const updateEnvelope = createAsyncThunk(
  "/envelopes/update",
  async (form, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, result, error } = await putRequest(
      "/envelopes/update",
      form,
      token
    );
    return error
      ? rejectWithValue(`Cannot sign up - Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  }
);

export const deleteEnvelope = createAsyncThunk(
  "/envelopes/delete",
  async (envelopeId, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, result, error } = await deleteRequest(
      `/envelopes/delete/${envelopeId}`,
      token
    );
    return error
      ? rejectWithValue(`Cannot sign up - Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  }
);

export const envelopeSlice = createSlice({
  name: "envelope",
  initialState: {
    loading: false,
    finish: false,
    selectEnvelope: null,
    newEnvelope: {},
    savings: [],
    expenses: [],
    challenges: [],
    selectedEnvelope: {},
    error: "",
  },
  reducers: {
    changeName: (state, action) => {
      return {
        ...state,
        newEnvelope: { ...state.newEnvelope, name: action.payload },
      };
    },

    changeAmount: (state, action) => {
      return {
        ...state,
        newEnvelope: { ...state.newEnvelope, amount: action.payload },
      };
    },
    handleType: (state, action) => {
      return {
        ...state,
        newEnvelope: { ...state.newEnvelope, type_id: action.payload },
      };
    },
    handleSelectedEnvelope: (state, action) => {
      return { ...state, selectedEnvelope: action.payload };
    },
    handleSelectEnvelope: (state, action) => {
      return { ...state, selectEnvelope: action.payload };
    },
    changeNameSelectEnvelope: (state, action) => {
      return {
        ...state,
        selectedEnvelope: { ...state.selectedEnvelope, name: action.payload },
      };
    },
    changeAmountSelectEnvelope: (state, action) => {
      return {
        ...state,
        selectedEnvelope: { ...state.selectedEnvelope, amount: action.payload },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ENVELOPES
      .addCase(getEnvelopes.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          finish: true,
          savings: sort([
            ...action.payload.envelopes.result.filter(
              (envelope) => envelope.type_id === TYPE_SAVINGS
            ),
          ]),
          expenses: [
            ...action.payload.envelopes.result.filter(
              (envelope) => envelope.type_id === TYPE_EXPENSES
            ),
          ],
          challenges: [
            ...action.payload.envelopes.result.filter(
              (envelope) => envelope.type_id === TYPE_CHALLENGES
            ),
          ],
        };
      })
      .addCase(getEnvelopes.rejected, (state) => {
        return { ...state, loading: false, finish: false };
      })
      .addCase(getEnvelopes.pending, (state) => {
        return { ...state, loading: true, finish: false };
      })

      // CREATE ENVELOPE
      .addCase(createEnvelope.fulfilled, (state, action) => {
        if (action.payload.envelope.type_id === TYPE_SAVINGS) {
          return {
            ...state,
            loading: false,
            finish: true,
            savings: [...state.savings, action.payload.envelope],
          };
        } else if (action.payload.envelope.type_id === TYPE_EXPENSES) {
          return {
            ...state,
            loading: false,
            finish: true,
            expenses: [...state.expenses, action.payload.envelope],
          };
        } else if (action.payload.envelope.type_id === TYPE_CHALLENGES) {
          return {
            ...state,
            loading: false,
            finish: true,
            challenges: [...state.challenges, action.payload.envelope],
          };
        }
      })
      .addCase(createEnvelope.rejected, (state) => {
        return { ...state, loading: false, finish: false };
      })
      .addCase(createEnvelope.pending, (state) => {
        return { ...state, loading: true, finish: false };
      })

      // DELETE ENVELOPE
      .addCase(deleteEnvelope.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          finish: true,
          savings: sort([
            ...state.savings.filter(
              (elt) => elt.id !== parseInt(action.payload.envelope.id)
            ),
          ]),
          expenses: [
            ...state.expenses.filter(
              (elt) => elt.id !== parseInt(action.payload.envelope.id)
            ),
          ],
          challenges: [
            ...state.challenges.filter(
              (elt) => elt.id !== parseInt(action.payload.envelope.id)
            ),
          ],
        };
      })
      .addCase(deleteEnvelope.rejected, (state) => {
        return { ...state, loading: false, finish: false };
      })
      .addCase(deleteEnvelope.pending, (state) => {
        return { ...state, loading: true, finish: false };
      })

      // UPDATE ENVELOPE
      .addCase(updateEnvelope.fulfilled, (state, action) => {
        if (action.payload.envelope.type_id === TYPE_SAVINGS) {
          return {
            ...state,
            loading: false,
            finish: true,
            savings: sort([
              ...state.savings.filter(
                (elt) => elt.id !== parseInt(action.payload.envelope.id)
              ),
              action.payload.envelope,
            ]),
          };
        } else if (action.payload.envelope.type_id === TYPE_EXPENSES) {
          return {
            ...state,
            loading: false,
            finish: true,
            expenses: sort([
              ...state.expenses.filter(
                (elt) => elt.id !== parseInt(action.payload.envelope.id)
              ),
              action.payload.envelope,
            ]),
          };
        } else if (action.payload.envelope.type_id === TYPE_CHALLENGES) {
          return {
            ...state,
            loading: false,
            finish: true,
            challenges: sort([
              ...state.challenges.filter(
                (elt) => elt.id !== parseInt(action.payload.envelope.id)
              ),
              action.payload.envelope,
            ]),
          };
        }
      })
      .addCase(updateEnvelope.rejected, (state) => {
        return { ...state, loading: false, finish: false };
      })
      .addCase(updateEnvelope.pending, (state) => {
        return { ...state, loading: true, finish: false };
      });
  },
});

export const {
  changeName,
  changeAmount,
  handleSelectEnvelope,
  changeNameSelectEnvelope,
  changeAmountSelectEnvelope,
  handleType,
  handleSelectedEnvelope,
} = envelopeSlice.actions;

export default envelopeSlice.reducer;
