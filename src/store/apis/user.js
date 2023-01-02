import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseUrl = "http://localhost:5000/api/user/";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints(build) {
    return {
      setAvatar: build.mutation({
        query({ userId, avatar }) {
          return {
            url: "avatar",
            method: "PUT",
            body: { userId, avatar },
          };
        },
      }),
    };
  },
});

export const { useSetAvatarMutation } = userApi;

export default userApi;
