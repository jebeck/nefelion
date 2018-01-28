import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { contexts, linkHover, linkText, linkVisited } from 'utils/themes';

const LinkEl = styled.a`
  :active,
  :hover {
    color: ${linkHover};
  }
  :visited {
    color: ${linkVisited};
  }
  :hover:visited {
    color: ${linkHover};
  }
  color: ${linkText};
  cursor: pointer;
  font-weight: bold;
`;

class Link extends Component {
  static propTypes = {
    context: PropTypes.oneOf(contexts).isRequired,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  };

  handleClick = e => {
    e.preventDefault();
    const { onClick, to } = this.props;
    onClick(to);
  };

  render() {
    const { context, text, to } = this.props;
    return (
      <LinkEl context={context} href={to} onClick={this.handleClick}>
        {text}
      </LinkEl>
    );
  }
}

export default Link;
