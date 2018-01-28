import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import styled from 'styled-components';

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

class NavMenu extends Component {
  static propTypes = {
    menuShowing: PropTypes.bool.isRequired,
    mode: PropTypes.oneOf(modes).isRequired,
    onClick: PropTypes.func.isRequired,
  };

  handleClick = (e, { name }) => {
    this.props.onClick(name === 'home' ? '/' : `/${name}`);
  };

  render() {
    const { mode, menuShowing } = this.props;
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
            <CustomColorMenuItem name="home" onClick={this.handleClick}>
              <Icon name="home" />
              home
            </CustomColorMenuItem>
            <CustomColorMenuItem name="login" onClick={this.handleClick}>
              <Icon name="sign in" />
              login
            </CustomColorMenuItem>
            <CustomColorMenuItem name="signup" onClick={this.handleClick}>
              <Icon name="add user" />
              sign up
            </CustomColorMenuItem>
          </div>
          <div>
            <CustomColorMenuItem name="help" onClick={this.handleClick}>
              <Icon name="help" />
              help
            </CustomColorMenuItem>
            <CustomColorMenuItem name="about" onClick={this.handleClick}>
              <Icon name="book" />
              about
            </CustomColorMenuItem>
          </div>
        </FlexMenu>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  return {
    menuShowing: state.app.menuShowing,
  };
}

export default connect(mapStateToProps)(NavMenu);
