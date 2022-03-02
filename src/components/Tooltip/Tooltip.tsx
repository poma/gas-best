import styled from "styled-components";
import Text from "../Text";

const Wrapper = styled.div`
  position: absolute;
  padding: 6px 8px;
  background: ${(props) => props.theme.bg.tooltip};
  border-radius: 6px;
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
  title: string;
  className?: string | undefined;
}

const Tooltip: React.FC<TooltipProps> = ({ children, className, title }) => (
  <Wrapper className={className}>
    <Title>{title}</Title>
    {children}
  </Wrapper>
);

export default Tooltip;
