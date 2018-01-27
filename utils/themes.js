import PropTypes from 'prop-types';
import { darken } from 'polished';
import theme from 'styled-theming';

const darkPurple = '#2B2C4A';
const mutedPurple = '#80677e';

const lightYellow = '#fff5cc';

const blue = '#406f96';

const neutral = '#f2f2f2';
const darkNeutral = darken(0.2, neutral);

const almostBlack = '#222222';
const almostWhite = '#f8f8ff';

export const modes = ['default', 'dark'];

export const backgroundColor = theme('mode', {
  default: almostWhite,
  dark: darkPurple,
});

export const buttonBackground = theme.variants('mode', 'subtype', {
  secondary: { default: blue, dark: blue },
});

export const buttonText = theme.variants('mode', 'subtype', {
  secondary: { default: neutral, dark: neutral },
});

export const cloud = theme.variants('mode', 'element', {
  bird: { default: almostBlack, dark: darkNeutral },
  path: { default: mutedPurple, dark: blue },
  text: { default: neutral, dark: neutral },
  sun: { default: lightYellow, dark: lightYellow },
});

export const mutedText = theme('mode', {
  default: mutedPurple,
  dark: lightYellow,
});

export const text = theme('mode', {
  default: darkPurple,
  dark: almostWhite,
});

export const themePropTypes = PropTypes.shape({
  mode: PropTypes.oneOf(modes).isRequired,
});
