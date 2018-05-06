import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon, Message } from 'semantic-ui-react';

import SignupForm from 'components/forms/SignupForm';
import FadeInOut from 'components/utils/FadeInOut';
import wrapPage, { FirebaseContext } from 'hoc/wrapPage';

const Signup = props => {
  const { onNavigate, pathname, status } = props;
  return (
    <FadeInOut pathname={pathname} status={status}>
      <Grid centered columns={16} verticalAlign="middle">
        <Grid.Column computer={9} mobile={16} tablet={9}>
          <Message attached="top" icon>
            <Icon name="add user" />
            <Message.Content>
              <Message.Header>sign up for a nefelion account</Message.Header>
            </Message.Content>
          </Message>
          <FirebaseContext.Consumer>
            {firebase => (
              <SignupForm firebase={firebase} onNavigate={onNavigate} />
            )}
          </FirebaseContext.Consumer>
        </Grid.Column>
      </Grid>
    </FadeInOut>
  );
};

Signup.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['entering', 'entered', 'exiting', 'exited'])
    .isRequired,
};

export default wrapPage(Signup);
