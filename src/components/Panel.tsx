import styled from "styled-components";

const Panel = styled.div`
  background-color: ${(props) => props.theme.bg.primary};
  border: 1px solid ${(props) => props.theme.bg.primary};
  border-radius: 6px;
  padding: 6px 8px 5px;
  cursor: default;
`;

export default Panel;
