import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
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
    };

    constructor(props) {
      super(props);

      this.store = initStore();
    }

    render() {
      const mode = 'dark';
      const theme = { mode };
      return (
        <Provider store={this.store}>
          <ThemeProvider theme={theme}>
            <WholeViewport>
              <Sidebar.Pushable>
                <NavMenu mode={mode} />
                <FullHeightPusher>
                  <Header theme={theme} />
                  <Divider />
                  <Grid columns={16} stackable>
                    <PageComponent theme={theme} />
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
