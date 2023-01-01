import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseUrl = "http://localhost:5000/api/auth/";

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
    };
  },
});

export const { useRegisterMutation } = authApi;

export default authApi;
