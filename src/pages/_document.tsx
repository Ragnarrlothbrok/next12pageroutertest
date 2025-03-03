/* eslint-disable prettier/prettier */
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import Script from 'next/script';
import { VWOScript } from "v-nextjs-smartcode";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <VWOScript accountId="735612" scriptAttributes={{
    nonce: "your-nonce-value"
  }} />
        </Head>
        <body>
          <Main />
          <NextScript />
<Script id="testScript" strategy="beforeInteractive">
  {`console.log('Test script loaded');`}
</Script>
        </body>
      </Html>
    );
  }
}
/* eslint-enable prettier/prettier */
