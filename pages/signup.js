import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Subscriber } from 'react-broadcast';
import { Grid, Icon, Message } from 'semantic-ui-react';
import styled from 'styled-components';

import SignupForm from 'components/forms/SignupForm';
import wrapPage, { TRANSITION_DURATIONS } from 'hoc/wrapPage';
import convertSecToMs from 'utils/convertSecToMs';

const Fader = styled(Grid.Row)`
  opacity: 0;
`;

class Signup extends Component {
  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['entering', 'entered', 'exiting', 'exited'])
      .isRequired,
  };

  constructor(props) {
    super(props);

    this.id = 'Page--Signup';
    this.state = { visible: false };
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
    const { onNavigate, status } = this.props;
    return (
      <Fader id={this.id} columns={1}>
        <Grid centered columns={16} verticalAlign="middle">
          <Grid.Column computer={9} mobile={16} tablet={9}>
            <Message attached="top" icon>
              <Icon name="add user" />
              <Message.Content>
                <Message.Header>sign up for a nefelion account</Message.Header>
              </Message.Content>
            </Message>
            <Subscriber channel="firebase">
              {firebase => (
                <SignupForm
                  firebase={firebase}
                  onNavigate={onNavigate}
                  status={status}
                />
              )}
            </Subscriber>
          </Grid.Column>
        </Grid>
      </Fader>
    );
  }
}

export default wrapPage(Signup);
