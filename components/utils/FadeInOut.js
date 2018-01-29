import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';

import { TRANSITION_DURATIONS } from 'hoc/wrapPage';
import convertSecToMs from 'utils/convertSecToMs';

const Fader = styled(Grid.Row)`
  opacity: 0;
`;

class FadeInOut extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    pathname: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['entering', 'entered', 'exiting', 'exited'])
      .isRequired,
  };

  constructor(props) {
    super(props);

    this.id = 'FadeInOut';
  }

  componentDidMount() {
    const { pathname } = this.props;
    this.mountAnimation = TweenMax.to(
      `#${this.id}`,
      convertSecToMs(TRANSITION_DURATIONS[pathname]),
      {
        ease: Power1.easeInOut,
        opacity: 1,
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    const { pathname } = this.props;
    if (this.props.status === 'entered' && nextProps.status === 'exiting') {
      if (this.mountAnimation) {
        this.mountAnimation.kill();
      }
      this.unmountAnimation = TweenMax.to(
        `#${this.id}`,
        convertSecToMs(TRANSITION_DURATIONS[pathname]),
        {
          ease: Power1.easeInOut,
          opacity: 0,
        }
      );
    }
  }

  componentWillUnmount() {
    if (this.mountAnimation) {
      this.mountAnimation.kill();
    }
    if (this.unmountAnimation) {
      this.unmountAnimation.kill();
    }
  }

  render() {
    return (
      <Fader columns={1} id={this.id}>
        {this.props.children}
      </Fader>
    );
  }
}

export default FadeInOut;
