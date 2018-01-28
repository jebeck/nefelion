import React from 'react';

import Cloud from 'components/Cloud';
import wrapPage from 'hoc/wrapPage';
import { themePropTypes } from 'utils/themes';

const Index = props => {
  const { theme } = props;
  return <Cloud theme={theme} />;
};

Index.propTypes = {
  theme: themePropTypes.isRequired,
};

export default wrapPage(Index);
