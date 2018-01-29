import { Container } from 'semantic-ui-react';
import styled from 'styled-components';

import {
  text,
  headingText,
  linkHover,
  linkText,
  linkVisited,
} from 'utils/themes';

const TextPage = styled(Container)`
  color: ${text};
  font-size: 1.5rem;
  line-height: 1.5;
  padding-top: 2rem;
  padding-bottom: 2rem;
  h1 {
    color: ${headingText};
  }
  a {
    :active,
    :hover {
      color: ${linkHover};
    }
    :visited {
      color: ${linkVisited};
    }
    :hover:visited {
      color: ${linkHover};
    }
    color: ${linkText};
    cursor: pointer;
    font-weight: bold;
  }
  li {
    padding: 0.25rem 0;
  }
  p {
    line-height: 1.5;
  }
`;

export default TextPage;
