import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import Header from "./Header";
import Head from "next/head";

const StyledMain = styled.main`
  margin: ${props => props.theme.headerHeight} 0 0 0;
`;

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <Head>
        <title>Streambanner</title>
      </Head>
      <Header />
      <StyledMain>{children}</StyledMain>
    </>
  );
};

export default Layout;
