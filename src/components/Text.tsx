import styled from "styled-components";

const Text = styled.span`
  font-size: 11px;
  font-weight: 400;
  color: ${(props) => props.theme.fg.primary};
`;

export default Text;
