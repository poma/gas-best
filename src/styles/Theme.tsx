import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  fg: {
    title: "#ffffff",
    primary: "#727383",
    secondary: "#ffffff",
    loader: "#47474f",
    danger: "#ee241d",
    warning: "#e7a921",
  },
  bg: {
    primary: "#21222D",
    secondary: "#171821",
    tertiary: "#323444",
    loader: "#303035",
    hover: "#3A3B47",
  },
  accent: {
    primary: "#20FFE2",
    secondary: "#00B2FF",
  },
};

type CustomTheme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends CustomTheme {}
}

const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
