import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import styled from 'styled-components';

import { makeLogoutRequester } from 'atomic/logout';
import { modes, disabledText, mutedText, text } from 'utils/themes';

const FlexMenu = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const DisabledMenuItem = styled(Menu.Item)`
  color: ${disabledText} !important;
  :hover,
  :active,
  :focus {
    color: ${disabledText} !important;
  }
  cursor: not-allowed !important;
`;

const MenuItem = styled(Menu.Item)`
  color: ${text} !important;
  :hover,
  :active,
  :focus {
    color: ${mutedText} !important;
  }
  cursor: pointer;
`;

const LOGGED_IN_ITEMS = {
  top: [
    {
      icon: 'home',
      name: 'home',
      text: 'home',
    },
    {
      icon: 'sign out',
      name: 'logout',
      text: 'log out',
    },
  ],
  bottom: [
    {
      icon: 'help',
      name: 'help',
      text: 'help',
    },
    {
      icon: 'book',
      name: 'about',
      text: 'about',
    },
  ],
};

const LOGGED_OUT_ITEMS = {
  top: [
    {
      icon: 'home',
      name: 'home',
      text: 'home',
    },
    {
      icon: 'add user',
      name: 'signup',
      text: 'sign up',
    },
    {
      icon: 'sign in',
      name: 'login',
      text: 'log in',
    },
  ],
  bottom: [
    {
      icon: 'help',
      name: 'help',
      text: 'help',
    },
    {
      icon: 'book',
      name: 'about',
      text: 'about',
    },
  ],
};

class NavMenu extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    loggedIn: PropTypes.bool.isRequired,
    logoutRequest: PropTypes.func.isRequired,
    menuShowing: PropTypes.bool.isRequired,
    mode: PropTypes.oneOf(modes).isRequired,
    onClick: PropTypes.func.isRequired,
    page: PropTypes.string.isRequired,
  };

  handleClick = (e, { name }) => {
    const { loggedIn, logoutRequest } = this.props;
    if (name === 'logout') {
      return logoutRequest();
    }
    this.props.onClick(
      _.includes(['home'], name) && !loggedIn ? '/' : `/${name}`
    );
  };

  render() {
    const { loggedIn, mode, menuShowing, page } = this.props;
    const items = loggedIn ? LOGGED_IN_ITEMS : LOGGED_OUT_ITEMS;
    return (
      <Sidebar
        animation="push"
        as={Menu}
        direction="right"
        icon="labeled"
        inverted={mode === 'dark'}
        vertical
        visible={menuShowing}
        width="thin"
      >
        <FlexMenu>
          <div>
            {items.top.map(({ icon, name, text }) => {
              const active = name === page;
              const MenuItemComponent = active ? DisabledMenuItem : MenuItem;
              return (
                <MenuItemComponent
                  active={name === page}
                  disabled={name === page}
                  key={name}
                  name={name}
                  onClick={this.handleClick}
                >
                  <Icon name={icon} />
                  {text}
                </MenuItemComponent>
              );
            })}
          </div>
          <div>
            {items.bottom.map(({ icon, name, text }) => {
              const active = name === page;
              const MenuItemComponent = active ? DisabledMenuItem : MenuItem;
              return (
                <MenuItemComponent
                  active={name === page}
                  disabled={name === page}
                  key={name}
                  name={name}
                  onClick={this.handleClick}
                >
                  <Icon name={icon} />
                  {text}
                </MenuItemComponent>
              );
            })}
          </div>
        </FlexMenu>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: Boolean(state.app.currentUser),
    menuShowing: state.app.menuShowing,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { firebase } = ownProps;
  const logoutRequest = makeLogoutRequester(firebase);
  return bindActionCreators({ logoutRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
