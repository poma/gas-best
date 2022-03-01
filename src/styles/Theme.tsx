import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  fg: {
    title: "#ffffff",
    primary: "#727383",
    secondary: "#ffffff",
  },
  bg: {
    container: "#171821",
    panel: "#21222D",
    tooltip: "#323444",
  },
};

const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
