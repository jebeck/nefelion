import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, propTypes as reduxFormPropTypes, reduxForm } from 'redux-form';
import { Form, Message, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

import { makeSignupRequester } from 'atomic/signup';
import Link from 'components/utils/Link';
import { errorText, formText } from 'utils/themes';

function validate(values) {
  const errors = {};

  if (values.email && values.email.search('@') === -1) {
    errors.email = 'an e-mail needs an @ somewhere...';
  }

  if (values.password && values.password.length < 8) {
    errors.password = 'password should be ≥ 8 characters';
  }

  return errors;
}

const PaddedGroup = styled(Form.Group)`
  padding-top: 0.5rem;
`;

const Label = styled.label`
  color: ${formText} !important;
`;

const InputError = styled.div`
  color: ${errorText};
  font-size: 0.92857143em;
  min-height: 2.5rem;
  padding-top: 0.25rem;
`;

const Input = ({
  input,
  label,
  placeholder,
  type,
  meta: { active, dirty, error, invalid, touched },
}) => {
  const shouldDisplayError = !active && error;
  return (
    <Form.Field required width={8}>
      <Label>{label}</Label>
      <Form.Input
        {...input}
        error={!active && dirty && invalid}
        placeholder={placeholder}
        type={type}
      />
      <InputError>
        {shouldDisplayError && (
          <span role="img" aria-label="prohibited emoji">
            🚫 [error]:
          </span>
        )}
        {shouldDisplayError && `  ${error}`}
      </InputError>
    </Form.Field>
  );
};

Input.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const SignupForm = props => {
  const {
    handleSubmit,
    invalid,
    onNavigate,
    onSubmit,
    pristine,
    reset,
    submitting,
    submitSucceeded,
  } = props;

  return (
    <Form
      as={Segment}
      attached
      size="large"
      success={submitSucceeded}
      warning={!submitSucceeded}
    >
      <Form.Group>
        <Field
          component={Input}
          label="e-mail"
          name="email"
          placeholder="an e-mail address you'll use to sign in"
          type="email"
        />
        <Field
          component={Input}
          label="password"
          name="password"
          placeholder="a strong password 🙏"
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
          onClick={reset}
        />
      </PaddedGroup>
      {submitSucceeded ? (
        <Message content="Submitted!" size="tiny" success />
      ) : (
        <Message size="tiny" warning>
          <Message.Content>
            already have an account?{' '}
            <Link
              context="form"
              onClick={onNavigate}
              text="login"
              to="/login"
            />{' '}
            instead
          </Message.Content>
        </Message>
      )}
    </Form>
  );
};

SignupForm.propTypes = {
  firebase: PropTypes.shape({
    auth: PropTypes.func.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  ...reduxFormPropTypes,
};

function mapDispatchToProps(dispatch, ownProps) {
  const { firebase } = ownProps;
  const signupRequest = makeSignupRequester(firebase);
  return bindActionCreators({ onSubmit: signupRequest }, dispatch);
}

export default reduxForm({
  form: 'signup',
  validate,
})(connect(undefined, mapDispatchToProps)(SignupForm));
