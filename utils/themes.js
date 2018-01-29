import PropTypes from 'prop-types';
import { darken, lighten } from 'polished';
import theme from 'styled-theming';

const brightPurple = '#510fad';
const darkPurple = '#2b2c4a';
const mutedPurple = '#80677e';

const lightYellow = '#fff5cc';

const blue = '#406f96';

const neutral = '#f2f2f2';
const darkNeutral = darken(0.2, neutral);

const almostBlack = '#222222';
const almostWhite = '#f8f8ff';

// from Semantic UI
const darkRed = '#912d2b';

export const modes = ['default', 'dark'];
export const contexts = ['default', 'form'];

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

export const errorText = theme.variants('mode', 'context', {
  default: {
    default: darkRed,
    dark: almostWhite,
  },
  form: {
    default: darkRed,
    dark: darkRed,
  },
});

export const formText = theme('mode', {
  default: darkPurple,
  dark: darkPurple,
});

export const headingText = theme('mode', {
  default: blue,
  dark: lightYellow,
});

export const linkHover = theme.variants('mode', 'context', {
  default: {
    default: lighten(0.2, brightPurple),
    dark: darken(0.2, lightYellow),
  },
  form: {
    default: lighten(0.2, brightPurple),
    dark: lighten(0.2, brightPurple),
  },
});

export const linkText = theme.variants('mode', 'context', {
  default: {
    default: brightPurple,
    dark: lightYellow,
  },
  form: {
    default: brightPurple,
    dark: brightPurple,
  },
});

export const linkVisited = theme('mode', {
  default: mutedPurple,
  dark: mutedPurple,
});

export const mutedText = theme('mode', {
  default: mutedPurple,
  dark: lightYellow,
});

export const text = theme('mode', {
  default: darkPurple,
  dark: neutral,
});

export const themePropTypes = PropTypes.shape({
  mode: PropTypes.oneOf(modes).isRequired,
});
