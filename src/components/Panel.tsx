import styled, { css } from "styled-components";

const Panel = styled.div<{ hoverable?: boolean }>`
  background-color: ${(props) => props.theme.bg.primary};
  border: 1px solid ${(props) => props.theme.bg.primary};
  border-radius: 6px;
  padding: 8px;

  ${(props) =>
    props.hoverable &&
    css`
      &: hover {
        border-color: ${(props) => props.theme.fg.primary};
        cursor: pointer;
      }
    `}
`;

export default Panel;
