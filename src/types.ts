export type RootState = {
  auth: {
    role: string;
    isAuthenticated: boolean;
    token: string;
    userId: string;
  };
  chat: {
    messages: string[];
  };
};

export type Message = {
  userId: string;
  message: string;
  response: {
    role: string;
    content: string;
  };
};
export type ChatState = {
  id: number;
  userId: number;
  messages: Message[];
};
