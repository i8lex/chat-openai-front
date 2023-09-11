import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Message = {
  userId: string;
  message: string;
  response: {
    role: string;
    content: string;
  };
};
type ChatState = {
  chat: Message[];
};

const initialState: ChatState = {
  chat: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.chat.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
