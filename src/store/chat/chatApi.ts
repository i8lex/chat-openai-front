import {
  BaseQueryApi,
  createApi,
  fetchBaseQuery,
  TagDescription,
} from "@reduxjs/toolkit/query/react";
import { RootState, ChatState, Message } from "../../types";
import { URL } from "../../constants";
const prepareHeaders = (
  headers: Headers,
  {
    getState,
  }: Pick<BaseQueryApi, "getState" | "extra" | "endpoint" | "type" | "forced">,
) => {
  const token = (getState() as RootState).auth.token;
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};

export const chatsApi = createApi({
  reducerPath: "chatsApi",
  tagTypes: ["Chats", "Chat"],
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders,
  }),

  endpoints: (build) => ({
    getChats: build.query<ChatState[], void>({
      query: () => "chats",
      providesTags: (
        result: ChatState[] | undefined,
      ): (TagDescription<"Chats"> | TagDescription<"Chat">)[] =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Chat" as const, id })),
              { type: "Chats" as const, id: "LIST" },
            ]
          : [{ type: "Chats" as const, id: "LIST" }],
    }),
    getChat: build.query({
      query: (id: string) => ({ url: `chats/${id}` }),
      providesTags: (result: ChatState | undefined, error, id: string) => [
        { type: "Chat", id },
        { type: "Chats", id: "LIST" },
      ],
    }),
    addChat: build.mutation<void, number>({
      query: (id) => ({
        url: `chats/${id}/create`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Chats", id: "LIST" }],
    }),
    deleteChat: build.mutation({
      query: (id) => ({
        url: `chats/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Chats", id: "LIST" }],
    }),
  }),
});

export const {
  useGetChatsQuery,
  useGetChatQuery,

  useAddChatMutation,
  useDeleteChatMutation,
} = chatsApi;
