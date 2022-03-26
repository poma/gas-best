import { createGlobalStyle, css } from "styled-components";

const isExt = !!process.env.REACT_APP_EXTENSION;

const ExtensionStyle = createGlobalStyle`
  ${() => {
    if (isExt) {
      return css`
        body,
        html {
          background: #30313a;
        }
      `;
    }
    return "";
  }}
`;

export default ExtensionStyle;
