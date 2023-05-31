import { createSlice } from "@reduxjs/toolkit";

export const loginModalSlice = createSlice({
  name: "loginModal",
  initialState: {
    visible: true,
  },
  reducers: {
    toggleLoginModal: (state) => {
      console.log(state.visible);
      return { ...state, visible: !state.visible };
    },
  },
});

export const { toggleLoginModal } = loginModalSlice.actions;
export default loginModalSlice.reducer;
