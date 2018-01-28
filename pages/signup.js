import React from 'react';
import PropTypes from 'prop-types';
import { Subscriber } from 'react-broadcast';
import { Grid, Icon, Message } from 'semantic-ui-react';

import SignupForm from 'components/SignupForm';
import wrapPage from 'hoc/wrapPage';

const Signup = props => (
  <Subscriber channel="firebase">
    {firebase => (
      <Grid.Row columns={1}>
        <Grid centered columns={16} verticalAlign="middle">
          <Grid.Column computer={9} mobile={16} tablet={9}>
            <Message attached="top" icon>
              <Icon name="add user" />
              <Message.Content>
                <Message.Header>sign up for a nefelion account</Message.Header>
              </Message.Content>
            </Message>
            <SignupForm firebase={firebase} onNavigate={props.onNavigate} />
          </Grid.Column>
        </Grid>
      </Grid.Row>
    )}
  </Subscriber>
);

Signup.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default wrapPage(Signup);
