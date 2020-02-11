import React, { useState, useEffect } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { lightTheme, darkTheme } from "../config/theme";
import Head from "next/head";
import Layout from "../components/Layout";
import { DarkModeContext, DARK_MODE_COOKIE_KEY } from "../libs/darkModeContext";
import { useLocalStorage } from "../libs/useLocalStorage";

const GlobalStyle = createGlobalStyle<{ darkMode: boolean }>`
  body {
    margin: 0;
    color: ${props =>
      props.darkMode ? darkTheme.color.text : lightTheme.color.text};
    font-family: 'Open Sans', sans-serif;
    background-color: ${props =>
      props.darkMode
        ? darkTheme.color.background
        : lightTheme.color.background};
  }
  * {
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    outline-color: ${props =>
      props.darkMode ? darkTheme.color.brand : lightTheme.color.brand}
  }
`;

const App = ({ Component, pageProps }) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const toggleDarkMode = () => {
    window.localStorage.setItem(DARK_MODE_COOKIE_KEY, (!darkMode).toString());
    setDarkMode(prevValue => !prevValue);
  };

  useEffect(() => {
    if (window) {
      const savedDarkMode = JSON.parse(
        window.localStorage.getItem(DARK_MODE_COOKIE_KEY)
      );
      if (savedDarkMode) {
        setDarkMode(savedDarkMode);
      }
    }
  }, []);

  return (
    <DarkModeContext.Provider
      value={{
        active: darkMode,
        toggle: toggleDarkMode
      }}
    >
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <GlobalStyle darkMode={darkMode} />
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
};

export default App;
