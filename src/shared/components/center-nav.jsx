import React from 'react';
import ReactSVG from 'react-svg'
import { Link as UnstyledLink } from 'react-router';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { Ul, Div } from '../style/util';
import { Hideable } from '../style/hideable';
import { scrollToTop } from '../style/scroll-helpers';

const CenterNavWrapper = styled(Div)`
  position: ${ props => props.fixed ? 'fixed' : 'static' };
  top: 0;
  width: 100%;
  @media (max-width: 500px) {
    background: ${ COLORS.gold };
    overflow: hidden;
    z-index: 100;
  }
`;
CenterNavWrapper.defaultProps = {
  zIndex: 1
};

export const CenterNavBackground = styled(Div)`
  width: 140px;
  padding-top: 20px;
  display: flex;
  flex-shrink: 0;
  height: ${ props => props.fullHeight ? '100vh' : props.height };
  min-height: ${ props => props.fullHeight ? '800px' : 0 };
  @media (max-width: 1230px) {
    width: 120px;
  }
  @media (max-width: 800px) {
    width: 100px;
  }
  @media (max-width: 500px) {
    display: none;
  }
`;

const List = styled(Ul)`
  list-style: none;
  padding: 0;
  margin-top: 12px;
  font-size: 1.1rem;
  line-height: 1.7rem;
  position: relative;
  top: ${ props => props.isMini ? '-100px' : '0' };
  @media (max-width: 1000px) {
    font-size: 15.4px;
    line-height: 23.8px;
  }
  @media (max-width: 800px) {
    font-size: 12px;
    line-height: 20px;
  }
  li a {
    color: ${ props => props.color };
  }
`;

const Nav = styled.div`
  text-align: center;
  margin-top: 1em;
  height: 80px;
  width: 140px;
  margin-right: auto;
  margin-left: auto;
  right: 0;
  left: 0;
  transition: height 0.4s ease-in-out;
  @media (max-width: 1230px) {
    width: 120px;
  }
  @media (max-width: 800px) {
    width: 100px;
  }
  @media (max-width: 500px) {
    height: ${ props => props.isExpanded ? '260px' : '50px' };
    width: auto;
    .hamburger-svg {
      fill: white !important;
    }
    .desk-nav-list {
      display: none;
    }
  }
  .hamburger-svg {
    fill: ${ props => props.color };
    width: 3rem;
    cursor: pointer;
    transition: color 0.4s ease;
  }
`;

const Link = styled(UnstyledLink)`
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  font-style: normal;
  &.active {
    cursor: default;
    font-style: italic;
  }
`;
Link.defaultProps = {
  activeClassName: 'active'
};

const NavLink = props => (
  <li>
    <Link
      to={ props.to }
      onClick={ scrollToTop }
    >
      { props.children }
    </Link>
  </li>
)

export const CenterNavMini = props => (
  <CenterNavBackground>
    <CenterNav
      { ...props }
      isExpanded={false}
      isMini={true}
    />
  </CenterNavBackground>
);

const DesktopMenu = props => (
  <List
    isMini={ props.isMini }
    background={ props.background }
    color={ props.color }
    className={ props.className }
  >
    <NavLink to="/">Home</NavLink>
    <NavLink to="/info">Information</NavLink>
    <NavLink to="/calendar">Calendar</NavLink>
    <NavLink to="/background">Background</NavLink>
    <NavLink to="/overview">Overview</NavLink>
    <NavLink to="/book">Book</NavLink>
  </List>
);

const MobileMenuStyle = styled.div`
  display: none;
  ul {
    position: static;
    font-size: 20px;
    line-height: 30px;
  }
  @media (max-width: 500px) {
    display: block;
    visibility: ${ props => props.isVisible ? 'visible' : 'hidden'};
  }
`;
const MobileMenu = props => (
  <MobileMenuStyle {...props} isVisible={true}>
    <DesktopMenu
      isMini={true}
      color='white'
    />
  </MobileMenuStyle>
);

export const CenterNav = React.createClass({

  getInitialState() {
    return {
      isUserExpanded: false
    }
  },

  onMouseEnter() {
    this.setState({
      isUserExpanded: true
    });
  },

  onMouseLeave() {
    this.setState({
      isUserExpanded: false
    });
  },

  toggleVisibility() {
    const expandedState = this.state.isUserExpanded;
    this.setState({
      isUserExpanded: !expandedState
    });
  },

  render() {
    const localContext = this.context.localContext;
    const props = this.props;
    return (
      <CenterNavWrapper
        className="center-nav-wrapper"
        fixed={ this.props.fixed }
        zIndex={ this.props.zIndex }
      >
        <Nav
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onClick={this.toggleVisibility}
          color={ props.color }
          isExpanded={ this.state.isUserExpanded }
        >
          <span>
            <ReactSVG
              path={ localContext.assetUrl('/images/hamburger.svg') }
              className="hamburger-svg"
            />
          </span>

          <Hideable
            isVisible={ this.props.isExpanded }
            forceVisibility={ this.state.isUserExpanded }
            listen
            hideInitially
          >
            <DesktopMenu {...props} className="desk-nav-list"/>
          </Hideable>

          <MobileMenu />

        </Nav>

      </CenterNavWrapper>
    );
  }
});

CenterNav.contextTypes = {
  localContext: React.PropTypes.object
};

CenterNav.defaultProps = {
  color: COLORS.white,
  isMini: false
};
