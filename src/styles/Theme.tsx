import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  fg: {
    title: "#ffffff",
    primary: "#727383",
    secondary: "#ffffff",
  },
  bg: {
    primary: "#21222D",
    secondary: "#171821",
    tooltip: "#323444",
  },
  accent: {
    primary: "#20FFE2",
    secondary: "#00B2FF",
  },
};

const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
