import styled from "styled-components";
import { hoverableIcon } from "~/styles/utils";

const NavButton = styled.button`
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 0;
  margin-left: 10px;
  vertical-align: middle;
  background: none;
  border: none;
  cursor: pointer;

  ${hoverableIcon}
`;

export default NavButton;
