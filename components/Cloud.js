/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { darken } from 'polished';
import styled from 'styled-components';

import { mount, unmount } from 'animations/cloud';
import { cloud } from 'utils/themes';

const SVG = styled.svg`
  height: 100vh;
  width: 100vh;
  position: fixed;
  top: 0;
  left: calc((100vw - 100vh)/2);
`;

const Text = styled.g`
  font-size: 4.5rem;
  font-weight: 600;
  fill: ${props => darken(0.2, cloud(props))};
  fill-opacity: 1;
`;

const Lines = styled.g`
  fill: none;
  stroke: ${cloud};
  stroke-linecap: round;
  stroke-opacity: 0;
  stroke-width: 5;
`;

const CircleFill = styled.path`
  fill: white;
  fill-opacity: 0;
`;

const CircleStrokeLower = styled.path`
  fill: none;
  stroke: ${cloud};
  stroke-opacity: 0;
  stroke-width: 5;
`;

const CircleStrokeUpper = styled.path`
  fill: none;
  stroke: white;
  stroke-opacity: 0;
  stroke-width: 5;
`;

const Birds = styled.g`
  fill: none;
  stroke: ${cloud};
  stroke-opacity: 0;
`;

const BirdsFlying = styled.g`
  fill: none;
  stroke: ${cloud};
  visibility: hidden;
`;

const SunStroke = styled.path`
  fill: none;
  stroke: ${props => darken(0.2, cloud(props))};
  stroke-opacity: 0;
  stroke-width: 2.5;
`;

const OuterSunFill = styled.path`
  fill: ${cloud};
  fill-opacity: 0;
  stroke: none;
`;

const InnerSunFill = styled.path`
  fill: white;
  fill-opacity: 0;
  stroke: none;
`;

class Cloud extends Component {
  static defaultProps = {
    readyToGo: false,
  };

  static propTypes = {
    status: PropTypes.oneOf(['entering', 'entered', 'exiting', 'exited'])
      .isRequired,
  };

  componentDidMount() {
    this.mountAnimation = mount();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.status === 'entered' && this.props.status === 'exiting') {
      if (this.mountAnimation) {
        this.mountAnimation.kill();
      }
      this.unmountAnimation = unmount();
    }
  }

  componentWillUnmount() {
    if (this.mountAnimation) {
      this.mountAnimation.kill();
    }
    if (this.unmountAnimation) {
      this.unmountAnimation.kill();
    }
  }

  render() {
    return (
      <SVG viewBox="-300 -300 1200 1200">
        <Lines element="path">
          <path id="Line--Top" d="M58.5 442.5h500" />
          <path id="Line--Bottom" d="M58.5 432.5h500" />
        </Lines>
        <g id="Circles">
          {/* right circle */}
          <g>
            <CircleFill
              className="Circles-Fill"
              d="M548.5 432.5c5.523 0 10-24.624 10-55 0-96.65-78.35-175-175-175s-175 78.35-175 175c0 30.376 4.477 55 10 55"
            />
            <CircleStrokeLower
              className="CirclesStroke--Lower"
              element="path"
              id="CircleStroke--LowerRight"
              d="M548.5 432.5c5.523 0 10-24.624 10-55 0-96.65-78.35-175-175-175s-175 78.35-175 175c0 30.376 4.477 55 10 55"
            />
            <CircleStrokeUpper
              className="CirclesStroke--Upper"
              id="CircleStroke--Right"
              d="M548.5 432.5c5.523 0 10-24.624 10-55 0-96.65-78.35-175-175-175s-175 78.35-175 175c0 30.376 4.477 55 10 55"
            />
          </g>
          {/* left circle */}
          <g>
            <CircleFill
              className="Circles-Fill"
              d="M78.5 442.5c-11.046 0-20-17.91-20-40 0-55.228 44.772-100 100-100s100 44.772 100 100c0 22.09-4.477 40-10 40"
            />
            <CircleStrokeLower
              className="CirclesStroke--Lower"
              element="path"
              id="CircleStroke--LowerLeft"
              d="M78.5 442.5c-11.046 0-20-17.91-20-40 0-55.228 44.772-100 100-100s100 44.772 100 100c0 22.09-4.477 40-10 40"
            />
            <CircleStrokeUpper
              className="CirclesStroke--Upper"
              id="CircleStroke--Left"
              d="M78.5 442.5c-11.046 0-20-17.91-20-40 0-55.228 44.772-100 100-100s100 44.772 100 100c0 22.09-4.477 40-10 40"
            />
          </g>
          <g id="Circles--Full">
            <CircleFill
              className="Circles-Fill"
              d="M233.5 382.5c-41.42 0-75-33.58-75-75s33.58-75 75-75 75 33.58 75 75-33.58 75-75 75z"
            />
            <CircleStrokeLower
              className="CirclesStroke--Lower"
              element="path"
              id="CircleStroke--LowerFull"
              d="M233.5 382.5c-41.42 0-75-33.58-75-75s33.58-75 75-75 75 33.58 75 75-33.58 75-75 75z"
            />
            <CircleStrokeUpper
              className="CirclesStroke--Upper"
              id="CircleStroke--Full"
              d="M233.5 382.5c-41.42 0-75-33.58-75-75s33.58-75 75-75 75 33.58 75 75-33.58 75-75 75z"
            />
          </g>
          <BirdsFlying element="bird" id="Birds--Flying">
            <path
              d="M446.453 62.758c27.194-4.795 44.768-6.144 48.125 12.893-3.357-19.036 16.783-20.99 43.977-25.785"
              id="Medium--Flying"
              strokeWidth="2.5"
            />
            <path
              d="M461.086 127.914c33.137 0 57.414 4.733 57.414 29.586 0-24.853 26.91-29.586 60.047-29.586"
              id="Large--Flying"
              strokeWidth="3.5"
            />
            <path
              d="M328.078 105.88c22.008 1.927 51.517.182 50.073 16.687 1.445-16.505 20.413-18.612 42.42-16.686"
              id="Small--Flying"
              strokeWidth="1.5"
            />
          </BirdsFlying>
          <Birds element="bird" id="Birds">
            <path
              d="M439.26 49.865c27.194-4.795 51.96 6.75 55.318 25.786-3.357-19.036 15.968-38.355 43.162-43.15"
              id="Medium"
              strokeWidth="2.5"
            />
            <path
              d="M458.5 112.5c33.137 0 60 20.147 60 45 0-24.853 26.863-45 60-45"
              id="Large"
              strokeWidth="3.5"
            />
            <path
              d="M340.917 89.195c22.008 1.926 38.678 16.867 37.234 33.372 1.445-16.505 20.456-28.325 42.463-26.4"
              id="Small"
              strokeWidth="1.5"
            />
          </Birds>
          {/* sun */}
          <g>
            {/* outer toothed sun circle */}
            <g id="OuterSun">
              <SunStroke
                element="sun"
                id="OuterSun-Stroke"
                d="M43.614 167.444l11.555-32.206-33.67-6.096 26.11-22.113L21.5 84.914l33.67-6.096-11.557-32.206L75.82 58.17l6.095-33.67 22.114 26.11L126.14 24.5l6.096 33.67 32.206-11.557L152.89 78.82l33.667 6.095-26.11 22.114 26.11 22.112-33.668 6.096 11.554 32.206-32.206-11.555-6.096 33.667-22.113-26.11-22.115 26.11-6.096-33.668z"
              />
              <OuterSunFill
                element="sun"
                id="OuterSun-Fill"
                d="M43.614 167.444l11.555-32.206-33.67-6.096 26.11-22.113L21.5 84.914l33.67-6.096-11.557-32.206L75.82 58.17l6.095-33.67 22.114 26.11L126.14 24.5l6.096 33.67 32.206-11.557L152.89 78.82l33.667 6.095-26.11 22.114 26.11 22.112-33.668 6.096 11.554 32.206-32.206-11.555-6.096 33.667-22.113-26.11-22.115 26.11-6.096-33.668z"
              />
            </g>
            {/* inner toothed sun circle */}
            <g id="InnerSun">
              <SunStroke
                element="sun"
                id="InnerSun-Stroke"
                d="M82.614 138.93l-3.06-14.053-14.054-3.06 7.774-12.1L65.5 97.613l14.054-3.06 3.06-14.054 12.102 7.774 12.1-7.774 3.06 14.054 14.055 3.06-7.773 12.102 7.774 12.1-14.053 3.06-3.06 14.055-12.1-7.773z"
              />
              <InnerSunFill
                id="InnerSun-Fill"
                d="M82.614 138.93l-3.06-14.053-14.054-3.06 7.774-12.1L65.5 97.613l14.054-3.06 3.06-14.054 12.102 7.774 12.1-7.774 3.06 14.054 14.055 3.06-7.773 12.102 7.774 12.1-14.053 3.06-3.06 14.055-12.1-7.773z"
              />
            </g>
          </g>
        </g>
        <Text element="text">
          <text className="Text" id="☁️" transform="translate(124 484)">
            <tspan x="0" y="76">
              ☁️
            </tspan>
          </text>
          <text className="Text" transform="translate(140 484)">
            <tspan x="69.88" y="68">
              nefelion
            </tspan>
          </text>
        </Text>
      </SVG>
    );
  }
}

export default Cloud;
