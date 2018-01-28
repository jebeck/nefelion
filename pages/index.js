import React from 'react';
import PropTypes from 'prop-types';

import Cloud from 'components/Cloud';
import wrapPage from 'hoc/wrapPage';
import { themePropTypes } from 'utils/themes';

const Index = props => {
  const { status, theme } = props;
  return <Cloud status={status} theme={theme} />;
};

Index.propTypes = {
  status: PropTypes.oneOf(['entering', 'entered', 'exiting', 'exited'])
    .isRequired,
  theme: themePropTypes.isRequired,
};

export default wrapPage(Index);
