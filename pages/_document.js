import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

const config = require('../package.json');
const semanticUiCssVersion = config.dependencies['semantic-ui-css'];

export default class NefelionDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();

    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

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
          {this.props.styleTags}
          <script src="/static/gsap/TweenMax.min.js" />
          <script src="/static/gsap/TimelineMax.min.js" />
          <script src="/static/gsap/DrawSVGPlugin.min.js" />
          <script src="/static/gsap/MorphSVGPlugin.min.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
