import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

// const baseUrl = "http://localhost:5000/api/auth/";
const baseUrl = `${process.env.REACT_APP_REQUEST_URL}api/auth/`;

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints(build) {
    return {
      register: build.mutation({
        query(user) {
          return {
            url: "register",
            method: "post",
            body: user,
          };
        },
      }),
      login: build.mutation({
        query(user) {
          return {
            url: "login",
            method: "post",
            body: user,
          };
        },
      }),
    };
  },
});

export const { useRegisterMutation, useLoginMutation } = authApi;

export default authApi;
