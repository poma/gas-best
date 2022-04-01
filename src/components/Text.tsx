import styled from "styled-components";

type TextVariant = "secondary" | "warning" | "danger";

const Text = styled.span<{ variant?: TextVariant }>`
  font-size: 11px;
  font-weight: 400;
  color: ${(props) =>
    props.variant ? props.theme.fg[props.variant] : props.theme.fg.primary};
`;

export default Text;
