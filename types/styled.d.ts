import "styled-components";

declare module "styled-components" {
  interface DefaultTheme {
    headerHeight: string;
    editorWidth: string;
    color: {
      text: string;
      input: string;
      inputActive: string;
      inputBoxShadow: string;
      brand: string;
      background: string;
      sectionBoxShadow: string;
    };
  }
}
