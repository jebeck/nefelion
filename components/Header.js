import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { lighten } from 'polished';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

import toggleMenu from 'atomic/toggleMenu';
import { hover } from 'animations/keyframes';
import {
  buttonBackground,
  buttonText,
  mutedText,
  themePropTypes,
} from 'utils/themes';

const HeaderEl = styled.header`
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

const ActiveButton = styled(Button)`
  background-color: ${buttonBackground} !important;
  color: ${buttonText} !important;
  :hover {
    background-color: ${props =>
      lighten(0.2, buttonBackground(props))} !important;
  }
`;

class Header extends Component {
  static propTypes = {
    menuShowing: PropTypes.bool.isRequired,
    theme: themePropTypes.isRequired,
    toggleMenu: PropTypes.func.isRequired,
  };

  handleClick = () => {
    const { menuShowing, toggleMenu } = this.props;
    toggleMenu(menuShowing);
  };

  render() {
    const { menuShowing } = this.props;
    return (
      <HeaderEl>
        <div>
          <span role="img" aria-label="cloud emoji">
            ☁️
          </span>
          <span>nefelion</span>
        </div>
        {menuShowing ? (
          <ActiveButton
            onClick={this.handleClick}
            size="small"
            subtype="secondary"
          >
            menu
          </ActiveButton>
        ) : (
          <Button onClick={this.handleClick} size="small">
            menu
          </Button>
        )}
      </HeaderEl>
    );
  }
}

function mapStateToProps(state) {
  return {
    menuShowing: state.app.menuShowing,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleMenu }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
