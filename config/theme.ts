import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  editorWidth: "300px",
  headerHeight: "60px",
  color: {
    text: "#424770",
    input: "#f6f9fc",
    inputActive: "#ffffff",
    inputBoxShadow: "#e4effa",
    brand: "#772ce8",
    background: "#ffffff",
    sectionBoxShadow: "#e4effa"
  }
};

export const darkTheme: DefaultTheme = {
  editorWidth: "300px",
  headerHeight: "60px",
  color: {
    text: "#efeff1",
    input: "#1b1b1b",
    inputActive: "#3e3e3e",
    inputBoxShadow: "transparent",
    brand: "#772ce8",
    background: "#0e0e10",
    sectionBoxShadow: "#212121"
  }
};
