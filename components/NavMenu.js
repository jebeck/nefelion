import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import styled from 'styled-components';

import { makeLogoutRequester } from 'atomic/logout';
import { modes, mutedText, text } from 'utils/themes';

const FlexMenu = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const CustomColorMenuItem = styled(Menu.Item)`
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
    firebase: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    logoutRequest: PropTypes.func.isRequired,
    menuShowing: PropTypes.bool.isRequired,
    mode: PropTypes.oneOf(modes).isRequired,
    onClick: PropTypes.func.isRequired,
  };

  handleClick = (e, { name }) => {
    if (name === 'logout') {
      const { logoutRequest } = this.props;
      logoutRequest();
    }
    this.props.onClick(_.includes(['home', 'logout'], name) ? '/' : `/${name}`);
  };

  render() {
    const { loggedIn, mode, menuShowing } = this.props;
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
            {items.top.map(({ icon, name, text }) => (
              <CustomColorMenuItem
                key={name}
                name={name}
                onClick={this.handleClick}
              >
                <Icon name={icon} />
                {text}
              </CustomColorMenuItem>
            ))}
          </div>
          <div>
            {items.bottom.map(({ icon, name, text }) => (
              <CustomColorMenuItem
                key={name}
                name={name}
                onClick={this.handleClick}
              >
                <Icon name={icon} />
                {text}
              </CustomColorMenuItem>
            ))}
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
