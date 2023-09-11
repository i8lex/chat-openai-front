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
