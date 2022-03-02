import React from "react";
import styled from "styled-components";
import { hoverableIcon } from "~/styles/utils";
import { ReactComponent as InfoSVG } from "./assets/info.svg";

const InfoIcon = styled(InfoSVG)`
  width: 12px;
  height: 12px;
`;

const IconContainer = styled.span`
  position: relative;
  display: inline-block;
  width: 12px;
  height: 12px;
  vertical-align: middle;
  cursor: pointer;

  ${hoverableIcon}
`;

const Info: React.FC = ({ children }) => (
  <IconContainer>
    <InfoIcon />
  </IconContainer>
);

export default Info;
