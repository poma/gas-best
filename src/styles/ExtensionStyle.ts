import { createGlobalStyle, css } from "styled-components";
import { IS_EXTENSION } from "~/config";

const ExtensionStyle = createGlobalStyle`
  ${() => {
    if (IS_EXTENSION) {
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
