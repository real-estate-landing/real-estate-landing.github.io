import type { FC } from "react";
import { Box, useTheme } from "@mui/material";
import Loader from "react-js-loader";

export const LoadingScreen: FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loader
        type="bubble-ping"
        bgColor={theme.palette.primary.main}
        color={theme.palette.primary.main}
        size={150}
      />
    </Box>
  );
};
