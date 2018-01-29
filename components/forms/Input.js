import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';

import { errorText, formText } from 'utils/themes';

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
      <InputError context="form">
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

export default Input;
