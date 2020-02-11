import React from "react";
import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  min-height: calc(100vh - ${props => props.theme.headerHeight});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 100px 80px 100px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    display: block;
    width: 40%;
    height: 100%;
    transform: skew(-40deg);
    background-color: ${props => props.theme.color.brand};
    opacity: 0.2;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: -5%;
    display: block;
    width: 20%;
    height: 100%;
    transform: skew(-40deg);
    background-color: #ff0000;
    opacity: 0.1;
  }

  * {
    position: relative;
  }
`;

const Title = styled.h1`
  font-size: 100px;
  line-height: 1;
  margin: 0 0 40px 0;
  max-width: 1000px;

  span {
    color: ${props => props.theme.color.brand};
  }
`;

const StyledA = styled.a`
  display: flex;
  min-width: 200px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  padding: 16px 20px;
  margin: 0 0 0 5px;
  font-size: 16px;
  background-color: ${props => props.theme.color.brand};
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;

  &:focus,
  &:hover {
    outline: none;
    background-color: #8d4def;

    img {
      transform: translateX(13px);
    }
  }

  img {
    width: 18px;
    margin: 2px 0 0 0;
    transform: translateX(10px);
    transition: 0.3s;
  }
`;

const Info = styled.p`
  font-size: 14px;
  margin: 25px 0 0 5px;

  a,
  a:visited {
    color: ${props => props.theme.color.text};
  }
`;

const Home = () => (
  <Container>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Title>
      Great <span>stream</span>
      <br /> deserves <br />
      Great <span>banner</span>
    </Title>
    <Link href="/design" passHref>
      <StyledA>
        Create yours <img src="/icon/arrow-forward.svg" alt="arrow right" />
      </StyledA>
    </Link>
    <Info>
      All assets are free to use commercially without any attribution.
    </Info>
  </Container>
);

export default Home;
