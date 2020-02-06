import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "../config/theme";
import Head from "next/head";
import Layout from "../components/Layout";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    color: ${theme.color.primary};
    font-family: 'Open Sans', sans-serif;
  }
  * {
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
  }
`;

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
