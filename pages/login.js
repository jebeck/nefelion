import React from 'react';
import PropTypes from 'prop-types';
import { Subscriber } from 'react-broadcast';
import { Grid, Icon, Message } from 'semantic-ui-react';

import LoginForm from 'components/forms/LoginForm';
import FadeInOut from 'components/utils/FadeInOut';
import wrapPage from 'hoc/wrapPage';

const Login = props => {
  const { onNavigate, pathname, status } = props;
  return (
    <FadeInOut pathname={pathname} status={status}>
      <Grid centered columns={16} verticalAlign="middle">
        <Grid.Column computer={9} mobile={16} tablet={9}>
          <Message attached="top" icon>
            <Icon name="sign in" />
            <Message.Content>
              <Message.Header>log in to your nefelion account</Message.Header>
            </Message.Content>
          </Message>
          <Subscriber channel="firebase">
            {firebase => (
              <LoginForm firebase={firebase} onNavigate={onNavigate} />
            )}
          </Subscriber>
        </Grid.Column>
      </Grid>
    </FadeInOut>
  );
};

Login.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['entering', 'entered', 'exiting', 'exited'])
    .isRequired,
};

export default wrapPage(Login);
