import { configureStore } from "@reduxjs/toolkit";
import authApi from "./apis/auth";
import userApi from "./apis/user";
import messageApi from "./apis/message";
import { authSlice } from "./slices/auth";
import { userSlice } from "./slices/user";

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [messageApi.reducerPath]: messageApi.reducer,
        auth: authSlice.reducer,
        user: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            userApi.middleware,
            messageApi.middleware
        ),
});

export default store;
