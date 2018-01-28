import React from 'react';
import PropTypes from 'prop-types';

import Cloud from 'components/Cloud';
import wrapPage from 'hoc/wrapPage';

const Index = props => {
  const { status } = props;
  return <Cloud status={status} />;
};

Index.propTypes = {
  status: PropTypes.oneOf(['entering', 'entered', 'exiting', 'exited'])
    .isRequired,
};

export default wrapPage(Index);
