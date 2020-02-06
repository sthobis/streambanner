import "styled-components";

declare module "styled-components" {
  interface DefaultTheme {
    headerHeight: string;
    editorWidth: string;
    color: {
      primary: string;
      secondary: string;
      brand: string;
    };
  }
}
