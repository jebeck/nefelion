import React, { Component } from 'react';
import { Button, Grid, Icon, Menu, Sidebar } from 'semantic-ui-react';
import styled, { ThemeProvider } from 'styled-components';

import { hover } from '../utils/animations';
import { backgroundColor, mutedText } from '../utils/themes';

const WholeViewport = styled.div`
  background-color: ${backgroundColor};
  height: 100vh;
  width: 100vw;
`;

const AppName = styled.header`
  div span:first-child {
    animation: ${hover} 2.5s linear infinite;
    display: inline-block;
    font-size: 1.75rem;
    padding-right: 0.5rem;
    vertical-align: text-bottom;
  }
  align-items: center;
  color: ${mutedText};
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  justify-content: space-between;
  padding: 0.75rem 1rem;
`;

const Divider = styled.hr`
  color: ${mutedText};
  margin: 0;
  opacity: 0.35;
`;

const FlexMenu = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export default function withLayout(PageComponent) {
  return class Page extends Component {
    constructor(props) {
      super(props);

      this.state = { menuShowing: true };
    }

    handleClick = () => {
      this.setState({ menuShowing: !this.state.menuShowing });
    };

    render() {
      const { menuShowing } = this.state;
      return (
        <ThemeProvider theme={{ mode: 'default' }}>
          <WholeViewport>
            <Sidebar.Pushable>
              <Sidebar
                animation="push"
                as={Menu}
                direction="right"
                icon="labeled"
                vertical
                visible={menuShowing}
                width="thin"
              >
                <FlexMenu>
                  <div>
                    <Menu.Item name="home">
                      <Icon name="home" />
                      home
                    </Menu.Item>
                    <Menu.Item name="login">
                      <Icon name="sign in" />
                      login
                    </Menu.Item>
                    <Menu.Item name="signup">
                      <Icon name="add user" />
                      sign up
                    </Menu.Item>
                  </div>
                  <div>
                    <Menu.Item name="help">
                      <Icon name="help" />
                      help
                    </Menu.Item>
                    <Menu.Item name="about">
                      <Icon name="book" />
                      about
                    </Menu.Item>
                  </div>
                </FlexMenu>
              </Sidebar>
              <Sidebar.Pusher>
                <AppName>
                  <div>
                    <span role="img" aria-label="cloud emoji">
                      ☁️
                    </span>
                    <span>nefelion</span>
                  </div>
                  <Button onClick={this.handleClick} size="small">
                    menu
                  </Button>
                </AppName>
                <Divider />
                <Grid />
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </WholeViewport>
        </ThemeProvider>
      );
    }
  };
}
