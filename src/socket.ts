import { io } from "socket.io-client";
import { URL } from "./constants";
import { store } from "./store/store";

const jwtToken = store.getState().auth.token;
console.log(jwtToken);
export const socket = io(URL, {
  extraHeaders: {
    Authorization: `Bearer ${jwtToken}`,
  },
});
