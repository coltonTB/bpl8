import React from 'react';
import ReactSVG from 'react-svg'
import { Link as UnstyledLink } from 'react-router';
import styled from 'styled-components';

import { COLORS } from '../constants';

import { Ul, Div } from '../style/util';

const CenterNavWrapper = styled(Div)`
  __comment: centerNav;
  display: flex;
  justify-content: center;
  top: 0;
  width: 100vw;
`;

export const CenterNavBackground = styled(Div)`
  width: 140px;
  padding-top: 20px;
  display: flex;
  flex-shrink: 0;
  height: ${ props => props.fullHeight ? '100vh' : props.height };
`;

const List = styled(Ul)`
  text-align: center;
  list-style: none;
  position: fixed;
  z-index: 1;
  padding: 0;
  font-size: 1.2em;
  line-height: 1.4em;
`;

const Link = styled(UnstyledLink)`
  text-decoration: none;
  color: ${ props => props.color };
  font-weight: bold;
`;

export const CenterNav = (props, {localContext}) => (
  <CenterNavWrapper>
    <List>
      <li>
        <ReactSVG
          path={ localContext.assetUrl('/images/hamburger.svg') }
          style={{
            fill: props.color,
            height: '46px',
            marginBottom: '12px'
          }}
        />
      </li>
      <li>
        <Link color={props.color} to="/">Home</Link>
      </li>
      <li>
        <Link color={props.color} to="/info">Information</Link>
      </li>
      <li>
        <Link color={props.color} to="/calendar">Calendar</Link>
      </li>
      <li>
        <Link color={props.color} to="/background">Background</Link>
      </li>
      <li>
        <Link color={props.color} to="/overview">Overview</Link>
      </li>
      <li>
        <Link color={props.color} to="/shop">Gift Shop</Link>
      </li>
    </List>
    { props.children }
  </CenterNavWrapper>
);

CenterNav.contextTypes = {
  localContext: React.PropTypes.object
};

CenterNav.defaultProps = {
  color: COLORS.white
};
