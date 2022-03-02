import { lighten } from "polished";
import { css } from "styled-components";

export const hoverableIcon = css`
  & > svg {
    path[fill] {
      fill: ${(props) => props.theme.fg.primary};
    }
    path[stroke] {
      stroke: ${(props) => props.theme.fg.primary};
    }
  }

  &:hover > svg {
    path[fill] {
      fill: ${(props) => lighten(0.2, props.theme.fg.primary)};
    }
    path[stroke] {
      stroke: ${(props) => lighten(0.2, props.theme.fg.primary)};
    }
  }
`;
