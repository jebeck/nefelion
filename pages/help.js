import React from 'react';
import PropTypes from 'prop-types';

import FadeInOut from 'components/utils/FadeInOut';
import TextPage from 'styled/TextPage';
import wrapPage from 'hoc/wrapPage';
import Divider from 'styled/Divider';

const About = props => {
  const { pathname, status } = props;
  return (
    <FadeInOut pathname={pathname} status={status}>
      <TextPage context="default" text>
        <h1>help</h1>
        <p>
          <span role="img" aria-label="prayer hands emoji">
            🙏
          </span>{' '}
          please file any issues you find{' '}
          <a href="https://github.com/jebeck/nefelion/issues" target="_blank">
            on GitHub
          </a>.
        </p>
      </TextPage>
    </FadeInOut>
  );
};

About.propTypes = {
  pathname: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['entering', 'entered', 'exiting', 'exited'])
    .isRequired,
};

export default wrapPage(About);
