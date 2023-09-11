import React, { FC, useState } from "react";
import PropTypes from "prop-types";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};
export const ChatInput: FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Ask me anything that I can help you or your team.. "
      />
      <button type={"button"} onClick={sendMessage}>
        Отправить
      </button>
    </div>
  );
};

ChatInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};
