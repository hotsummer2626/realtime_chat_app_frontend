import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

// const baseUrl = "http://localhost:5000/api/users/";
const baseUrl = `${process.env.REACT_APP_REQUEST_URL}api/users/`;

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
      getAllUsers: build.query({
        query() {
          return "";
        },
      }),
    };
  },
});

export const { useSetAvatarMutation, useGetAllUsersQuery } = userApi;

export default userApi;
