import { configureStore } from "@reduxjs/toolkit";
import loginModalSlice from "./reducers/loginModal.slice";
import login from "./reducers/login.slice";
import signup from "./reducers/signup.slice";
import user from "./reducers/user.slice";
import envelope from "./reducers/envelope.slice";
import storage from "redux-persist/lib/storage";
import operations from "./reducers/operation.slice.js";
import graphics from "./reducers/graphics.slice.js";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, login);

export const store = configureStore({
  reducer: {
    persistedReducer,
    loginModalSlice,
    user,
    signup,
    envelope,
    operations,
    graphics,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
