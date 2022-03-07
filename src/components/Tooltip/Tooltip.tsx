import { ReactNode } from "react";
import styled from "styled-components";
import Text from "../Text";

const Wrapper = styled.div`
  position: absolute;
  padding: 6px 8px;
  background: ${(props) => props.theme.bg.tertiary};
  border-radius: 6px;
  text-align: left;
  white-space: nowrap;
  z-index: 10;

  p {
    color: ${(props) => props.theme.fg.secondary};
    margin: 2px 0;
  }
`;

const Title = styled(Text)`
  display: block;
`;

interface TooltipProps {
  title?: ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, className, title }) => (
  <Wrapper className={className}>
    {title && <Title>{title}</Title>}
    {children}
  </Wrapper>
);

export default Tooltip;
