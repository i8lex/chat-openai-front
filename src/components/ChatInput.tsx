import React, { FC, useState } from "react";
import PropTypes from "prop-types";
import { CustomInput } from "./Input";
import { Stack } from "@mui/material";
import { SendIcon } from "./svg/Send";
import UnstyledLinkButton from "./Button";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
type ChatInputProps = {
  onSendMessage: (message: string, chatId?: number) => void;
  chatId?: number;
};
export const ChatInput: FC<ChatInputProps> = ({ onSendMessage, chatId }) => {
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
    <Stack
      direction="column"
      useFlexGap
      spacing="12px"
      alignItems="start"
      justifyContent="start"
      sx={{ width: "100%", maxWidth: "736px", mt: "24px" }}
    >
      <Typography
        variant="h2"
        component="h2"
        sx={{
          width: "100%",
          fontWeight: 700,
          fontSize: 18,
          fontFamily: "Nunito",
          color: "var(--grey, #ACADAD)",
        }}
      >
        AgileGPT writing..
      </Typography>
      <Stack
        direction="row"
        useFlexGap
        alignItems="center"
        justifyContent="start"
        width="100%"
        sx={{ w: "100%" }}
      >
        <CustomInput
          style={{ width: "100%", maxWidth: "680px" }}
          type={"text"}
          value={message}
          onChange={handleMessageChange}
          placeholder="Ask me anything that I can help you or your team.. "
        />

        <Button
          style={{ marginLeft: "4px" }}
          type="submit"
          variant="text"
          disableElevation={true}
          onClick={sendMessage}
        >
          <SendIcon />
        </Button>
      </Stack>
    </Stack>
  );
};

ChatInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};
