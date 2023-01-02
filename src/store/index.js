import { configureStore } from "@reduxjs/toolkit";
import authApi from "./apis/auth";
import userApi from "./apis/user";
import { authSlice } from "./slices/auth";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
});

export default store;
