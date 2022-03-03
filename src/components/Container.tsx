import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 420px;
  background-color: ${(props) => props.theme.bg.secondary};
  border-radius: 24px;
  padding: 20px 24px 24px;
  margin: 50px auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  flex: 1 0 auto;
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
  nav: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, title, nav }) => {
  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        <Nav>{nav}</Nav>
      </Header>
      {children}
    </Wrapper>
  );
};

export default Container;
