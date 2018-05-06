import App, { Container } from 'next/app';
import { withRouter } from 'next/router';
import React from 'react';

class CustomApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <Container>
        <Component router={router} {...pageProps} />
      </Container>
    );
  }
}

export default withRouter(CustomApp);
