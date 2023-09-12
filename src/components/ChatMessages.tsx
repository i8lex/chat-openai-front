import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Box, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { PolygonIconOrange } from "./svg/PolygonIconOrange";
import { PolygonIconBlue } from "./svg/PolygonIconBlue";
import theme from "../theme";

export const ChatMessages: React.FC = () => {
  const { messages } = useSelector((state: RootState) => state.chat);

  return (
    <Stack
      direction="column"
      alignItems="center"
      useFlexGap
      spacing="28px"
      justifyContent="space-between"
      sx={{ display: "flex", width: "100%", overflowY: "scroll" }}
    >
      {messages
        ? messages.map(({ message, response }, index: number) => (
            <Stack
              key={message.id}
              direction="column"
              alignItems="center"
              useFlexGap
              spacing="28px"
              justifyContent="space-between"
              sx={{ display: "flex", width: "100%" }}
            >
              <Box
                sx={{
                  alignSelf: "flex-end",
                  position: "relative",
                  bgcolor: "var(--accent-2, #FEE2C5)",
                  [theme.breakpoints.down("md")]: {
                    py: "12px",
                    px: "12px",
                    maxWidth: "260px",
                    mx: "16px",
                    borderRadius: "10px",
                  },

                  py: "25px",
                  px: "44px",
                  width: "100%",
                  maxWidth: "680px",
                  mx: "40px",
                  borderRadius: "40px",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "-6px",
                    right: "-16px",
                  }}
                >
                  <PolygonIconOrange />
                </Box>
                <Typography
                  variant="inherit"
                  component="p"
                  sx={{
                    fontWeight: 700,
                    fontSize: 16,
                    [theme.breakpoints.down("md")]: {
                      fontSize: 12,
                    },
                    fontFamily: "Nunito",
                    color: "#000A10",
                  }}
                >
                  {message}
                </Typography>
              </Box>
              <Box
                sx={{
                  alignSelf: "flex-start",
                  position: "relative",
                  bgcolor: "var(--blue, #C4DDFF)",
                  px: "44px",
                  mx: "40px",
                  [theme.breakpoints.down("md")]: {
                    px: "12px",
                    mx: "16px",
                    maxWidth: "260px",
                    py: "12px",
                    borderRadius: "10px",
                  },

                  py: "25px",
                  width: "100%",
                  maxWidth: "680px",
                  borderRadius: "40px",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "-6px",
                    left: "-16px",
                  }}
                >
                  <PolygonIconBlue />
                </Box>
                <Typography
                  variant="inherit"
                  component="p"
                  sx={{
                    fontWeight: 700,
                    fontSize: 16,
                    [theme.breakpoints.down("md")]: {
                      fontSize: 12,
                    },
                    fontFamily: "Nunito",
                    color: "#000A10",
                  }}
                >
                  {response.content}
                </Typography>
              </Box>
            </Stack>
          ))
        : null}
    </Stack>
  );
};
