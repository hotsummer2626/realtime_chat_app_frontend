import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseUrl = "http://localhost:5000/api/";

const messageApi = createApi({
    reducerPath: "messageApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    endpoints(build) {
        return {
            addMessage: build.mutation({
                query({ from, to, message }) {
                    return {
                        url: "messages",
                        method: "POST",
                        body: { from, to, message },
                    };
                },
            }),
            getAllMessages: build.mutation({
                query({ senderId, receiverId }) {
                    return {
                        url: `messages/${senderId}/${receiverId}`,
                        method: "POST",
                    };
                },
            }),
        };
    },
});

export const { useAddMessageMutation, useGetAllMessagesMutation } = messageApi;

export default messageApi;
