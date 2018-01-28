import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { Provider } from 'react-redux';
import Router from 'next/router';
import { Grid, Sidebar } from 'semantic-ui-react';
import styled, { ThemeProvider } from 'styled-components';

import Header from 'components/Header';
import NavMenu from 'components/NavMenu';
import initStore from 'store/initStore';
import { backgroundColor, mutedText } from 'utils/themes';

const WholeViewport = styled.div`
  background-color: ${backgroundColor};
  height: 100vh;
  width: 100vw;
`;

const FullHeightPusher = styled(Sidebar.Pusher)`
  display: flex;
  flex-direction: column;
  *:nth-child(3) {
    flex-grow: 100;
  }
`;

const Divider = styled.hr`
  color: ${mutedText};
  margin: 0;
  opacity: 0.35;
`;

const TRANSITION_DURATIONS = {
  '/': 2500,
  '/login': 500,
};

export default function withLayout(PageComponent) {
  return class Page extends Component {
    static async getInitialProps({ req }) {
      const isServer = Boolean(req);
      const store = initStore(isServer);
      return { initialState: store.getState(), isServer };
    }

    static propTypes = {
      initialState: PropTypes.object,
      isServer: PropTypes.bool,
      url: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }),
    };

    constructor(props) {
      super(props);

      this.state = { readyToGo: false };
      this.store = initStore();
    }

    // componentDidMount() {
    //   Router.onRouteChangeComplete = url => {
    //     this.setState({ readyToGo: false })
    //   }
    // }

    handleNavigation = path => {
      const { url: { pathname } } = this.props;
      this.setState({ readyToGo: true }, () => {
        setTimeout(() => {
          Router.push(path);
        }, TRANSITION_DURATIONS[pathname]);
        Router.prefetch(path);
      });
    };

    render() {
      const { url: { pathname } } = this.props;
      const mode = 'dark';
      const theme = { mode };
      return (
        <Provider store={this.store}>
          <ThemeProvider theme={theme}>
            <WholeViewport>
              <Sidebar.Pushable>
                <NavMenu mode={mode} onClick={this.handleNavigation} />
                <FullHeightPusher>
                  <Header theme={theme} />
                  <Divider />
                  <Grid columns={16} stackable>
                    <Transition
                      in={!this.state.readyToGo}
                      timeout={TRANSITION_DURATIONS[pathname]}
                    >
                      {status => (
                        <PageComponent status={status} theme={theme} />
                      )}
                    </Transition>
                  </Grid>
                </FullHeightPusher>
              </Sidebar.Pushable>
            </WholeViewport>
          </ThemeProvider>
        </Provider>
      );
    }
  };
}
