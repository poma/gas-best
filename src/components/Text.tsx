import styled, { css } from "styled-components";

const Text = styled.span<{ secondary?: boolean; block?: boolean }>`
  ${(props) =>
    props.block &&
    css`
      display: block;
    `}

  font-size: 11px;
  font-weight: 400;
  color: ${(props) =>
    props.secondary ? props.theme.fg.secondary : props.theme.fg.primary};
`;

export default Text;
