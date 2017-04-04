import React from 'react';
import { Link as UnstyledLink } from 'react-router';
import styled from 'styled-components';

import { COLORS } from '../constants';

export const CenterNav = styled.div`
  __comment: centerNav;
  display: flex;
  justify-content: center;
  top: 0;
  width: 100vw;
`;

export const CenterNavInner = styled.div`
  position: fixed;
  background: ${ props => props.background || COLORS.gold };
  width: 140px;
  height: 110vh;
  padding-top: 20px;
`;

const Ul = styled.ul`
  text-align: center;
  list-style: none;
  position: fixed;
  z-index: 1;
  padding: 0;
`;

const Link = styled(UnstyledLink)`
  text-decoration: none;
  color: white;
  font-weight: bold;
`;

export const CenterNavList = props => (
  <Ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/info">Information</Link>
    </li>
    <li>
      <Link to="/calendar">Calendar</Link>
    </li>
    <li>
      <Link to="/background">Background</Link>
    </li>
    <li>
      <Link to="/overview">Overview</Link>
    </li>
    <li>
      <Link to="/shop">Gift Shop</Link>
    </li>
  </Ul>
);

const CenterNavComponent = props => (
  <CenterNav {...props} >
    <CenterNavInner {...props} />
  </CenterNav>
);

export default CenterNavComponent;
