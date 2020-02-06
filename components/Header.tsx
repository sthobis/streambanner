import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.theme.headerHeight};
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 0 20px;
  z-index: 1000;
  box-shadow: 0 0 0 1px #e4effa;
`;

const Logo = styled.a`
  font-size: 20px;
  font-weight: 700;
  padding: 5px 10px;
  text-decoration: none;
  color: ${props => props.theme.color.primary};
  margin: 0 40px 0 0;
`;

const NavLink = styled.a`
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  color: ${props => props.theme.color.primary};
`;

const Header = () => {
  return (
    <header>
      <Container>
        <Link href="/" passHref>
          <Logo>StreamBanner</Logo>
        </Link>
        <Link href="/design" passHref>
          <NavLink>Create Banner</NavLink>
        </Link>
      </Container>
    </header>
  );
};

export default Header;
