import { FC } from "react";
import { ChatState } from "../types";
import Typography from "@mui/material/Typography";

type ChatCardProps = {
  chat?: ChatState;
};

export const ChatCard: FC<ChatCardProps> = ({ chat }) => {
  return (
    <Typography
      variant="inherit"
      component="p"
      sx={{
        height: "60px",
        alignSelf: "flex-start",
        textAlign: "start",
        fontWeight: 700,
        fontSize: 10,
        p: "2px",
        overflowY: "scroll",
        fontFamily: "Nunito",
        color: "#000A10",
      }}
    >
      {chat?.messages[0].response.content}
    </Typography>
  );
};
