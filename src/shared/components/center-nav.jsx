import React from 'react';
import { Link as UnstyledLink } from 'react-router';
import styled from 'styled-components';
import ReactSVG from 'react-svg'

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
  font-size: 1.2em;
  line-height: 1.4em;
`;

const Link = styled(UnstyledLink)`
  text-decoration: none;
  color: ${ props => props.color };
  font-weight: bold;
`;

const ScrollPromptWrapper = styled(Div)`
  position: absolute;
  bottom: 0;
  z-index: 1;
  margin-bottom: 30px;
  color: ${ COLORS.white }
`;

export const ScrollPrompt = (props, {localContext}) => (
  <ScrollPromptWrapper>
    <div>Scroll</div>
    <ReactSVG
      path={ localContext.assetUrl('/images/down_arrow.svg') }
      style={{
        fill: COLORS.white
      }}
    />
  </ScrollPromptWrapper>
);

ScrollPrompt.contextTypes = {
  localContext: React.PropTypes.object
};

export const CenterNavList = (props, {localContext}) => (
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
);

CenterNavList.contextTypes = {
  localContext: React.PropTypes.object
};

CenterNavList.defaultProps = {
  color: COLORS.white
};

const CenterNavComponent = props => (
  <CenterNav {...props} >
    <CenterNavInner {...props} />
  </CenterNav>
);

export default CenterNavComponent;
