import React from 'react';
import { Link as UnstyledLink } from 'react-router';
import styled from 'styled-components';

import { COLORS } from '../constants';

import { Ul, Div } from '../style/util';

export const CenterNav = styled(Div)`
  __comment: centerNav;
  display: flex;
  justify-content: center;
  top: 0;
  width: 100vw;
`;

export const CenterNavInner = styled(Div)`
  width: 140px;
  height: 100vh;
  padding-top: 20px;
`;
CenterNavInner.defaultProps = {
  background: COLORS.gold
};

export const CenterNavPlaceholder = styled(CenterNavInner)`
  display: flex;
  flex-shrink: 0;
  position: static;
  background: none;
  height: ${ props => props.fullHeight ? '100vh' : 'initial' };
`;

const List = styled(Ul)`
  text-align: center;
  list-style: none;
  position: fixed;
  z-index: 1;
  padding: 0;
`;

const Link = styled(UnstyledLink)`
  text-decoration: none;
  color: ${ props => props.color };
  font-weight: bold;
`;
Link.defaultProps = {
  color: COLORS.white
};

export const CenterNavList = props => (
  <List >
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
);

const CenterNavComponent = props => (
  <CenterNav {...props} >
    <CenterNavInner {...props} />
  </CenterNav>
);

export default CenterNavComponent;
