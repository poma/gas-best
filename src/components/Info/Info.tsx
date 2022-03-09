import React, { useState } from "react";
import styled from "styled-components";
import { hoverableIcon } from "~/styles/utils";
import Tooltip from "../Tooltip";
import { ReactComponent as InfoSVG } from "./assets/info.svg";

const InfoIcon = styled(InfoSVG)`
  width: 12px;
  height: 12px;
`;

const InfoTooltip = styled(Tooltip)<{ show: boolean }>`
  top: 100%;
  left: -1px;
  width: 160px;
  margin-top: 10px;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  white-space: normal;
`;

const IconContainer = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  vertical-align: middle;
  cursor: pointer;

  ${hoverableIcon}
`;

interface InfoProps {
  onShowTooltip?: () => void;
  onHideTooltip?: () => void;
}

const Info: React.FC<InfoProps> = ({
  children,
  onShowTooltip,
  onHideTooltip,
  ...props
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <IconContainer
      className="info-tooltip"
      {...props}
      onMouseEnter={() => {
        onShowTooltip?.();
        setShowTooltip(true);
      }}
      onMouseLeave={() => {
        onHideTooltip?.();
        setShowTooltip(false);
      }}
    >
      <InfoIcon />
      <InfoTooltip show={showTooltip}>{children}</InfoTooltip>
    </IconContainer>
  );
};

export default Info;
