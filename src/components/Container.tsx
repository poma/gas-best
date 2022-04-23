import styled, { css } from "styled-components";
import { IS_EXTENSION } from "~/config";

const Wrapper = styled.div`
  max-width: 420px;
  min-width: 420px;
  background-color: ${(props) => props.theme.bg.secondary};
  padding: 20px 24px 24px;
  margin: 50px auto;
  border-radius: 24px;

  ${() =>
    IS_EXTENSION &&
    css`
      margin: 0;
      border-radius: 0;
    `};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  flex: 1 0 auto;
  min-height: 40px;
  padding-bottom: 20px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.fg.title};
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  user-select: none;
`;

const Nav = styled.nav``;

interface ContainerProps {
  title: string;
  nav?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, title, nav }) => {
  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        {!!nav && <Nav>{nav}</Nav>}
      </Header>
      {children}
    </Wrapper>
  );
};

export default Container;
