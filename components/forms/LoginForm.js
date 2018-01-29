import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, propTypes as reduxFormPropTypes, reduxForm } from 'redux-form';
import { Form, Message, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

import { clearLoginFailure, makeLoginRequester } from 'atomic/login';
import Input from 'components/forms/Input';
import Link from 'components/utils/Link';

function validate(values) {
  const errors = {};

  if (values.email) {
    if (values.email.search('@') === -1) {
      errors.email = 'an e-mail needs an @ somewhere...';
    }
  } else {
    errors._error = 'A required field is missing';
  }

  if (!values.password) {
    errors._error = 'A required field is missing';
  }

  return errors;
}

const PaddedGroup = styled(Form.Group)`
  padding-top: 0.5rem;
`;

class LoginForm extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      auth: PropTypes.func.isRequired,
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    loginError: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    ...reduxFormPropTypes,
  };

  handleReset = () => {
    const { clearLoginFailure, reset } = this.props;
    reset();
    clearLoginFailure();
  };

  render() {
    const {
      handleSubmit,
      invalid,
      onNavigate,
      onSubmit,
      pristine,
      loginError,
      submitting,
      submitSucceeded,
    } = this.props;

    return (
      <Form
        as={Segment}
        attached
        error={submitSucceeded && Boolean(loginError)}
        size="large"
        success={submitSucceeded && !loginError}
        warning={!submitSucceeded}
      >
        <Form.Group>
          <Field component={Input} label="e-mail" name="email" type="email" />
          <Field
            component={Input}
            label="password"
            name="password"
            type="password"
          />
        </Form.Group>
        <PaddedGroup>
          <Form.Button
            color="teal"
            content="submit"
            disabled={invalid || pristine || submitting}
            onClick={handleSubmit(onSubmit)}
          />
          <Form.Button
            content="reset"
            disabled={pristine || submitting}
            onClick={this.handleReset}
          />
        </PaddedGroup>
        {submitSucceeded ? (
          loginError ? (
            <Message content={loginError.message} size="tiny" error />
          ) : (
            <Message content="Submitted!" size="tiny" success />
          )
        ) : (
          <Message size="tiny" warning>
            <Message.Content>
              don't have an account?{' '}
              <Link
                context="form"
                onClick={onNavigate}
                text="sign up"
                to="/signup"
              />{' '}
              instead
            </Message.Content>
          </Message>
        )}
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginError: state.app.loginError,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { firebase } = ownProps;
  const signupRequest = makeLoginRequester(firebase);
  return bindActionCreators(
    { clearLoginFailure, onSubmit: signupRequest },
    dispatch
  );
}

export default reduxForm({
  form: 'signup',
  validate,
})(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
