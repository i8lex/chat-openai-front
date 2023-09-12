import { useEffect, useState } from "react";
import { ChatInput } from "../components/ChatInput";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useDispatch, useSelector } from "react-redux";
import { addChatInitial, addMessage } from "../store/chat/chatSlice";
import { ChatMessages } from "../components/ChatMessages";
import { socket } from "../socket";
import {
  useAddChatMutation,
  useGetChatsQuery,
  useGetChatQuery,
} from "../store/chat/chatApi";
import { RootState } from "../store/store";
import * as React from "react";
import { Stack } from "@mui/material";
import { HeartIcon } from "../components/svg/HeartIcon";
import { ChatCard } from "../components/ChatCard";
import theme from "../theme";

const ChatPage = () => {
  const [chatId, setChatId] = useState(0);
  const dispatch = useDispatch();
  const [addChat] = useAddChatMutation();
  const userId = useSelector((state: RootState) => state.auth.id);
  const { data: chats, refetch: refetchChats } = useGetChatsQuery();
  const { data: chat, isSuccess: isChatSuccess } = useGetChatQuery(
    chatId.toString(),
    {
      refetchOnMountOrArgChange: true,
      skip: chatId === 0,
    },
  );

  useEffect(() => {
    if (isChatSuccess && chat) {
      dispatch(addChatInitial(chat.messages));
    }
  }, [isChatSuccess, chat, dispatch]);

  useEffect(() => {
    socket.on("chatMessage", (data) => {
      console.log("Received message from server:", data);
      dispatch(addMessage(data));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const handleUserMessage = async (message: string) => {
    socket.emit("chatMessage", {
      message,
      userId: userId,
      chatId: chat ? chat.id : 0,
    });
    await refetchChats();
  };

  const handleAddChat = async () => {
    if (userId) {
      const response = await addChat(userId);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xl"
      style={{ padding: 0 }}
      sx={{
        bgcolor: "#D8E1ED",
        height: "100vh",
        display: "flex",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          mt: "54px",
          [theme.breakpoints.between("xs", "md")]: {
            mt: "20px",
          },
          ml: "44px",
          [theme.breakpoints.between("xs", "md")]: {
            ml: "16px",
          },
          [theme.breakpoints.between("xs", "sm")]: {
            display: "none",
          },

          width: "100%",
          maxWidth: "180px",
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: "center",
            mb: "64px",
            [theme.breakpoints.between("xs", "md")]: {
              mb: "20px",
            },
            [theme.breakpoints.between("xs", "sm")]: {
              fontSize: 12,
            },
            fontWeight: 700,
            fontSize: 24,
            fontFamily: "Nunito",
            color: "#000A10",
          }}
        >
          Agile
        </Typography>

        <Stack
          direction="row"
          useFlexGap
          spacing="12px"
          alignItems="center"
          justifyContent="center"
          sx={{ display: "flex", mb: "64px", mx: "10px", mt: "9px" }}
        >
          <HeartIcon />
          <Typography
            variant="h2"
            component="h2"
            sx={{
              [theme.breakpoints.between("xs", "sm")]: {
                display: "hidden",
              },
              textAlign: "center",
              fontWeight: 700,
              fontSize: 18,
              fontFamily: "Nunito",

              color: "#000A10",
            }}
          >
            AI Agile Coach
          </Typography>
        </Stack>
        <Typography
          variant="inherit"
          component="p"
          sx={{
            fontWeight: 700,
            fontSize: 14,
            mb: "6px",
            fontFamily: "Nunito",
            color: "#000A10",
          }}
        >
          Chat history
        </Typography>
        <Stack
          direction="column"
          useFlexGap
          spacing="12px"
          sx={{ display: "flex", maxHeight: "240px", overflowY: "scroll" }}
        >
          {chats?.map((chat, index) => {
            return (
              <>
                <Box
                  key={Math.random() + index}
                  sx={{
                    cursor: "pointer",
                    fontSize: "10px",
                    borderRadius: "10px",
                    justifyContent: "start",
                    height: "60px",
                    border: 1,
                    borderColor: "#eeeeee",
                    bgcolor: "#ffffff",
                  }}
                  onClick={async () => {
                    setChatId(chat.id);
                  }}
                >
                  <ChatCard key={Math.random()} chat={chat} />
                </Box>
              </>
            );
          })}
        </Stack>
      </Box>
      <Box
        maxWidth="xl"
        sx={{
          bgcolor: "#ffffff",
          position: "relative",
          mt: "42px",

          [theme.breakpoints.between("xs", "sm")]: {
            mt: "20px",
          },
          ml: "45px",
          [theme.breakpoints.between("xs", "sm")]: {
            ml: "0",
          },
          width: "100%",
          pt: "60px",
          [theme.breakpoints.between("xs", "sm")]: {
            pt: "20px",
          },
          pb: "54px",
          [theme.breakpoints.between("xs", "sm")]: {
            pb: "24px",
          },
          px: "20px",
          [theme.breakpoints.between("xs", "sm")]: {
            px: "0",
          },

          marginBottom: "42px",
          borderRadius: "40px",
          display: "flex",
        }}
      >
        <Box
          sx={{
            bgcolor: "#ffffff",
            height: "40px",
            width: "100%",
            maxWidth: "80vh",
            position: "absolute",
            top: "0",
            right: "0",
          }}
        />
        <Box
          sx={{
            bgcolor: "#ffffff",
            height: "40px",
            width: "100%",
            maxWidth: "80vh",
            position: "absolute",
            bottom: "0",
            right: "0",
          }}
        />
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          sx={{ display: "flex", width: "100%" }}
        >
          <ChatMessages />
          <ChatInput onSendMessage={handleUserMessage} chatId={chat?.id} />
        </Stack>
      </Box>
    </Container>
  );
};

export default ChatPage;
