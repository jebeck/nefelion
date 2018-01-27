import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

const config = require('../package.json');
const semanticUiCssVersion = config.dependencies['semantic-ui-css'];

export default class NefelionDocument extends Document {
  render() {
    const viewportContent =
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui';
    return (
      <html lang="en">
        <Head>
          <title>nefelion</title>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="viewport" content={viewportContent} />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />
          <link
            rel="stylesheet"
            href={`https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/${semanticUiCssVersion}/semantic.min.css`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
