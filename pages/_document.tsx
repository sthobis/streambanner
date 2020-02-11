import Document, {
  DocumentContext,
  Main,
  Html,
  NextScript,
  Head
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/png" href="/favicon.png" />
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Create personalized banner and panel for your stream using our easy-to-use editor."
          />
          <meta property="og:title" content="StreamBanner" />
          <meta
            property="og:description"
            content="Create personalized banner and panel for your stream using our easy-to-use editor."
          />
          <meta
            property="og:image"
            content="https://streambanner.now.sh/ogimage.png"
          />
          {this.props.styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
