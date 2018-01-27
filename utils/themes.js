import theme from 'styled-theming';

export const backgroundColor = theme('mode', {
  default: 'GhostWhite',
  dark: '#27153e',
});

export const mutedText = theme('mode', {
  default: '#80677e',
  dark: '#fff5cc',
});
