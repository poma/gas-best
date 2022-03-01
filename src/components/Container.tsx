import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 420px;
  background-color: ${(props) => props.theme.bg.container};
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
`;

const Nav = styled.nav``;

const Button = styled.button`
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 0;
  margin-left: 10px;
  vertical-align: middle;
  background: none no-repeat center;
  background-image: url("/icons/${(props) => props.name}.svg");
  background-size: 16px;
  border: none;
  cursor: pointer;
`;

const Container: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Header>
        <Title>Recommended gas prices</Title>
        <Nav>
          <Button name="paste" title="one" />
          <Button name="notification" title="two" />
        </Nav>
      </Header>
      {children}
    </Wrapper>
  );
};

export default Container;
