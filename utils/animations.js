import { keyframes } from 'styled-components';

export const hover = keyframes`
  0% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-20%);
  }

  80% {
    transform: translateY(5%);
  }

  100% {
    transform: translateY(0);
  }
`;
