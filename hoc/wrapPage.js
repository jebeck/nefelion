import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Broadcast } from 'react-broadcast';
import { Transition } from 'react-transition-group';
import { Provider } from 'react-redux';
import Router from 'next/router';
import { Grid, Sidebar } from 'semantic-ui-react';
import styled, { ThemeProvider } from 'styled-components';

import toggleMenu from 'atomic/toggleMenu';
import Header from 'components/Header';
import NavMenu from 'components/NavMenu';
import initStore from 'store/initStore';
import initFirebase, { getFirebaseConfig } from 'utils/initFirebase';
import logger from 'utils/logger';
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

export const TRANSITION_DURATIONS = {
  '/': 2500,
  '/about': 0,
  '/help': 0,
  '/login': 750,
  '/signup': 750,
};

export default function withLayout(PageComponent) {
  return class Page extends Component {
    static async getInitialProps({ req }) {
      const isServer = Boolean(req);
      const store = initStore(isServer);
      const firebaseConfig = getFirebaseConfig();

      return { firebaseConfig, initialState: store.getState(), isServer };
    }

    static propTypes = {
      firebaseConfig: PropTypes.shape({
        apiKey: PropTypes.string,
        authDomain: PropTypes.string,
        databaseURL: PropTypes.string,
        projectId: PropTypes.string,
        storageBucket: PropTypes.string,
        messagingSenderId: PropTypes.string,
      }),
      initialState: PropTypes.object.isRequired,
      isServer: PropTypes.bool.isRequired,
      url: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }),
    };

    constructor(props) {
      super(props);

      this.log = logger(props.isServer, 'Page', '#f08080');
      this.store = initStore();
      this.firebase = initFirebase(
        props.firebaseConfig,
        props.isServer,
        this.store.dispatch
      );
      if (!this.firebase) {
        this.log('Ahhh, no Firebase! 😱');
      }
      this.state = { readyToGo: false };
    }

    handleNavigation = path => {
      const { url: { pathname } } = this.props;
      const { app: { menuShowing } } = this.store.getState();
      this.setState({ readyToGo: true }, () => {
        setTimeout(() => {
          Router.push(path);
        }, TRANSITION_DURATIONS[pathname]);
        if (menuShowing) {
          setTimeout(() => {
            this.store.dispatch(toggleMenu(menuShowing));
          }, TRANSITION_DURATIONS[pathname] + 250);
        }
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
            <Broadcast channel="firebase" value={this.firebase}>
              <WholeViewport>
                <Sidebar.Pushable>
                  <NavMenu mode={mode} onClick={this.handleNavigation} />
                  <FullHeightPusher>
                    <Header theme={theme} />
                    <Divider />
                    <Grid columns={16} stackable verticalAlign="middle">
                      <Transition
                        in={!this.state.readyToGo}
                        timeout={TRANSITION_DURATIONS[pathname]}
                      >
                        {status => (
                          <PageComponent
                            onNavigate={this.handleNavigation}
                            pathname={pathname}
                            status={status}
                            theme={theme}
                          />
                        )}
                      </Transition>
                    </Grid>
                  </FullHeightPusher>
                </Sidebar.Pushable>
              </WholeViewport>
            </Broadcast>
          </ThemeProvider>
        </Provider>
      );
    }
  };
}
