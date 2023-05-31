import { createSlice } from "@reduxjs/toolkit";
export const graphicsSlice = createSlice({
  name: "graphics",
  initialState: {
    loading: false,
    finish: false,
    error: "",
    options: {},
    dataRadialBar: [{}],
    dataMultipleRadialBar: [],
    labels: [],
    visible: false,
  },
  reducers: {
    handleVisible: (state, action) => {
      return { ...state, visible: action.payload };
    },
    handleDataRadialBar: (state, action) => {
      return { ...state, dataRadialBar: action.payload };
    },
    handleDataMultipleRadialBar: (state, action) => {
      return {
        ...state,
        dataMultipleRadialBar: [...state.dataMultipleRadialBar, action.payload],
      };
    },
    handleLabelsMultipleRadialBar: (state, action) => {
      return {
        ...state,
        labels: [...state.labels, action.payload],
      };
    },
    deleteFromLabelsMultipleRadialBar: (state, action) => {
      return {
        ...state,
        labels: state.labels.filter((item) => item === action.payload),
      };
    },
    deleteFromDataMultipleRadialBar: (state, action) => {
      return {
        ...state,
        dataMultipleRadialBar: state.dataMultipleRadialBar.filter(
          (item) => item === action.payload
        ),
      };
    },
  },
});

export const {
  handleVisible,
  handleDataRadialBar,
  handleDataMultipleRadialBar,
  handleLabelsMultipleRadialBar,
  deleteFromDataMultipleRadialBar,
  deleteFromLabelsMultipleRadialBar,
} = graphicsSlice.actions;

export default graphicsSlice.reducer;
