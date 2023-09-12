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
                  py: "25px",
                  [theme.breakpoints.between("xs", "md")]: {
                    py: "12px",
                  },
                  px: "44px",
                  [theme.breakpoints.between("xs", "md")]: {
                    px: "12px",
                  },
                  width: "100%",

                  [theme.breakpoints.between("md", "xl")]: {
                    maxWidth: "680px",
                  },
                  [theme.breakpoints.between("xs", "md")]: {
                    maxWidth: "220px",
                  },
                  [theme.breakpoints.between("md", "xl")]: {
                    marginX: "40px",
                  },
                  [theme.breakpoints.between("xs", "md")]: {
                    marginX: "16px",
                  },

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
                    [theme.breakpoints.between("xs", "md")]: {
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
                  py: "25px",
                  [theme.breakpoints.between("xs", "md")]: {
                    py: "12px",
                  },
                  px: "44px",
                  [theme.breakpoints.between("xs", "md")]: {
                    px: "12px",
                  },
                  width: "100%",
                  maxWidth: "680px",
                  [theme.breakpoints.between("md", "lg")]: {
                    maxWidth: "380px",
                  },
                  [theme.breakpoints.between("xs", "md")]: {
                    maxWidth: "220px",
                  },
                  borderRadius: "40px",
                  mx: "40px",
                  [theme.breakpoints.between("xs", "md")]: {
                    mx: "16px",
                  },
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
                    [theme.breakpoints.between("xs", "md")]: {
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
