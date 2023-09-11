import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const ChatMessages: React.FC = () => {
  const messages = useSelector((state: RootState) => state.chat.chat);

  return (
    <div>
      <ul>
        {messages.map(({ message, response }, index: number) => (
          <div key={index}>
            <li>{message}</li>
            <li>{response.content}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};
