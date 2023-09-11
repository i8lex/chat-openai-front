import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chat/chatSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import authSlice from "./auth/authSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";
import { authApi } from "./auth/authApi";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "isAuthenticated", "role", "answers", "userId"],
};
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    // @ts-ignore
    auth: persistReducer(authPersistConfig, authSlice),
    [authApi.reducerPath]: authApi.reducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
  ],
});
setupListeners(store.dispatch);
export const persistor = persistStore(store);
