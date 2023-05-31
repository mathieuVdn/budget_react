import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "../../api/api";
import { getItem, setItem } from "../../utils/storage.utils";
import {sortByDate} from "../../utils/sort.utils";

export const getOperation = createAsyncThunk(
  `/envelopes/operation`,
  async (id, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, result, error } = await getRequest(
      `/envelopes/operation/${id}`,
      token
    );
    return error
      ? rejectWithValue(`Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  }
);

export const createOperation = createAsyncThunk(
  "/operations/create",
  async (form, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, result, error } = await postRequest(
      "/operations/create",
      form,
      token
    );
    return error
      ? rejectWithValue(`Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  }
);

export const updateOperation = createAsyncThunk(
  "/operations/update/:id",
  async (form, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, result, error } = await putRequest(
      `/operations/update/${form.id}`,
      form,
      token
    );
    return error
      ? rejectWithValue(`Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  }
);

export const deleteOperation = createAsyncThunk(
  "/operations/delete",
  async (id, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, result, error } = await deleteRequest(
      `/operations/delete/${id}`,
      token
    );
    return error
      ? rejectWithValue(`Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  }
);

export const operationsSlice = createSlice({
  name: "operations",
  initialState: {
    loading: false,
    finish: false,
    select: null,
    newOperation: {},
    envelope: [],
    operations: [],
    selectedOperation: {},
    selectOperation: null,
    error: "",
  },
  reducers: {
    changeNameOperation: (state, action) => {
      return {
        ...state,
        newOperation: { ...state.newOperation, name: action.payload },
      };
    },
    changeAmountOperation: (state, action) => {
      return {
        ...state,
        newOperation: { ...state.newOperation, amount: action.payload },
      };
    },
    changeDateOperation: (state, action) => {
      return {
        ...state,
        newOperation: { ...state.newOperation, date: action.payload },
      };
    },
    handleEnvelopeIdCreate: (state, action) => {
      return {
        ...state,
        newOperation: {
          ...state.newOperation,
          envelope_id: parseInt(action.payload),
        },
      };
    },
    handleEnvelopeIdUpdate: (state, action) => {
      return {
        ...state,
        selectedOperation: {
          ...state.selectedOperation,
          envelope_id: action.payload,
        },
      };
    },
    handleSelectOperation: (state, action) => {
      return { ...state, selectOperation: action.payload };
    },
    handleSelectedOperation: (state, action) => {
      return { ...state, selectedOperation: action.payload };
    },
    changeNameSelectedOperation: (state, action) => {
      return {
        ...state,
        selectedOperation: { ...state.selectedOperation, name: action.payload },
      };
    },
    changeAmountSelectedOperation: (state, action) => {
      return {
        ...state,
        selectedOperation: {
          ...state.selectedOperation,
          amount: action.payload,
        },
      };
    },
    changeDateSelectedOperation: (state, action) => {
      return {
        ...state,
        selectedOperation: { ...state.selectedOperation, date: action.payload },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // get operation
      .addCase(getOperation.fulfilled, (state, action) => {
        console.log(action.payload)
        return {
          ...state,
          operations: action.payload.envelope[0].operations,
          envelope: action.payload.envelope,
          loading: false,
        };
      })
      .addCase(getOperation.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(getOperation.rejected, (state, action) => {
        return { ...state, error: action.payload };
      })
      // create operation
      .addCase(createOperation.fulfilled, (state, action) => {
        return {
          ...state,
          operations: [...state.operations, action.payload.operation],
          loading: false,
        };
      })
      .addCase(createOperation.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(createOperation.rejected, (state, action) => {
        return { ...state, error: action.payload };
      })
      // delete operation
      .addCase(deleteOperation.fulfilled, (state, action) => {
        return {
          ...state,
          operations: [
            ...state.operations.filter(
              (operation) => operation.id !== parseInt(action.payload.id)
            ),
          ],
          loading: false,
        };
      })
      .addCase(deleteOperation.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(deleteOperation.rejected, (state, action) => {
        return { ...state, error: action.payload };
      })
      // update operation
      .addCase(updateOperation.fulfilled, (state, action) => {
        return {
          ...state,
          operations: [
            ...state.operations.filter(
              (op) => op.id !== parseInt(action.payload.operation.id)
            ),
            action.payload.operation,
          ],
          loading: false,
        };
      })
      .addCase(updateOperation.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(updateOperation.rejected, (state, action) => {
        return { ...state, error: action.payload };
      });
  },
});

export const {
  changeNameOperation,
  changeAmountOperation,
  changeDateOperation,
  handleEnvelopeIdCreate,
  handleEnvelopeIdUpdate,
  handleSelectOperation,
  handleSelectedOperation,
  changeNameSelectedOperation,
  changeAmountSelectedOperation,
  changeDateSelectedOperation,
} = operationsSlice.actions;
export default operationsSlice.reducer;
