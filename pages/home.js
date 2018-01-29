import React from 'react';
import PropTypes from 'prop-types';

import FadeInOut from 'components/utils/FadeInOut';
import TextPage from 'styled/TextPage';
import wrapPage from 'hoc/wrapPage';

const Home = props => {
  const { pathname, status } = props;
  return (
    <FadeInOut pathname={pathname} status={status}>
      <TextPage context="default" text>
        <h1>logged-in home</h1>
      </TextPage>
    </FadeInOut>
  );
};

Home.propTypes = {
  pathname: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['entering', 'entered', 'exiting', 'exited'])
    .isRequired,
};

export default wrapPage(Home);
