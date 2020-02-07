import React, { useContext } from "react";
import styled from "styled-components";
import Link from "next/link";
import { DarkModeContext } from "../libs/darkModeContext";
import Toggle from "./Toggle";

const Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.theme.headerHeight};
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.color.background};
  padding: 0 40px;
  z-index: 1000;
  box-shadow: 0 0 0 1px ${props => props.theme.color.sectionBoxShadow};
`;

const Logo = styled.a`
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
  color: ${props => props.theme.color.text};
  margin: 0 40px 0 0;
`;

const NavLink = styled.a`
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  color: ${props => props.theme.color.text};
`;

const StyledToggle = styled(Toggle)`
  margin-left: auto;
`;

const Header = () => {
  const { active, toggle } = useContext(DarkModeContext);

  return (
    <header>
      <Container>
        <Link href="/" passHref>
          <Logo>StreamBanner</Logo>
        </Link>
        <Link href="/design" passHref>
          <NavLink>Create Banner</NavLink>
        </Link>
        <StyledToggle
          text="Twitch dark mode"
          checked={active}
          onChange={toggle}
        />
      </Container>
    </header>
  );
};

export default Header;
