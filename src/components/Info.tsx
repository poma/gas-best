import React from "react";
import styled from "styled-components";

const Icon = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  background-image: url("/icons/info.svg");
  background-size: 12px 12px;
  background-position: center;
  background-repeat: no-repeat;
  vertical-align: middle;
  cursor: pointer;
`;

const Info: React.FC = ({ children }) => <Icon />;

export default Info;
