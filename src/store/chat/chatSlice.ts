import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatState, Message } from "../../types";

const initialState: { messages: any[]; chatId: number | null } = {
  messages: [],
  chatId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message[]>) => {
      state.messages.push(action.payload);
    },
    addChatInitial: (state, action: PayloadAction<Message[]>) => {
      state.messages = [...action.payload];
    },
    addChatId: (state, action: PayloadAction<number>) => {
      state.chatId = action.payload;
    },
  },
});

export const { addMessage, addChatInitial, addChatId } = chatSlice.actions;
export default chatSlice.reducer;
