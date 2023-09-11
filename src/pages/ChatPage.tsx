import { useEffect } from "react";
import { ChatInput } from "../components/ChatInput";
// import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/chat/chatSlice";
import { ChatMessages } from "../components/ChatMessages";
import { socket } from "../socket";

const ChatPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("chatMessage", (data) => {
      console.log("Received message from server:", data);
      dispatch(addMessage(data));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const handleUserMessage = (message: string) => {
    console.log(message);
    socket.emit("chatMessage", message);
  };

  return (
    <div>
      <ChatMessages />
      <ChatInput onSendMessage={handleUserMessage} />
    </div>
  );
};

export default ChatPage;
