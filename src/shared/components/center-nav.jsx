import React from 'react';
import {Link as UnstyledLink} from 'react-router';
import styled from 'styled-components';

const COLORS = {
  gold: '#ffc200'
};

const CenterNav = styled.div`
  display: flex;
  justify-content: center;
  top: 0;
  width: 100vw;
`;

const CenterNavInner = styled.div`
  position: fixed;
  background: ${COLORS.gold};
  width: 100px;
  z-index: 1;
  height: 110vh;
`;

const Ul = styled.ul`
  text-align: center;
  list-style: none;
`;

const Link = styled(UnstyledLink)`
  text-decoration: none;
  color: white;
  font-weight: bold;
`;

const CenterNavComponent = props => (
  <CenterNav style={props.style}>
    <CenterNavInner className="rm--center-nav__inner">
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
    </CenterNavInner>
  </CenterNav>
);

export default CenterNavComponent;
