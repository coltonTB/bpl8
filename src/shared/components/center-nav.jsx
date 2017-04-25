import React from 'react';
import ReactSVG from 'react-svg'
import { Link as UnstyledLink } from 'react-router';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { Ul, Div } from '../style/util';
import { Hideable } from '../style/hideable';
import { scrollToTop } from '../style/scroll-helpers';

const CenterNavWrapper = styled(Div)`
  __comment: centerNav;
  position: ${ props => props.fixed ? 'fixed' : 'static' };
  display: flex;
  justify-content: center;
  top: 0;
  width: 100vw;
  z-index: 1;
`;

export const CenterNavBackground = styled(Div)`
  width: 140px;
  padding-top: 20px;
  display: flex;
  flex-shrink: 0;
  height: ${ props => props.fullHeight ? '100vh' : props.height };
`;

const List = styled(Ul)`
  list-style: none;
  padding: 0;
  margin-top: 12px;
  font-size: 1.2em;
  line-height: 1.4em;
  position: relative;
  top: ${ props => props.isMini ? '-100px' : '0' };
  li a {
    color: ${ props => props.color };
  }
`;

const Nav = styled.div`
  text-align: center;
  margin-top: 1em;
  height: 80px;
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
)

export const CenterNav = React.createClass({

  getInitialState() {
    return {
      isUserExpanded: false
    }
  },

  toggleUserExpandedState() {
    const isUserExpanded = !this.state.isUserExpanded;
    this.setState({
      isUserExpanded
    });
  },

  render() {
    const localContext = this.context.localContext;
    const props = this.props;

    return (
      <CenterNavWrapper className="center-nav-wrapper" fixed={ this.props.fixed }>
        <Nav>
          <span onClick={ this.toggleUserExpandedState }>
            <ReactSVG
              path={ localContext.assetUrl('/images/hamburger.svg') }
              style={{
                fill: props.color,
                height: '46px',
                cursor: 'pointer'
              }}
            />
          </span>

          <Hideable
            isVisible={ this.props.isExpanded }
            forceVisibility={ this.state.isUserExpanded }
            listen
            showInitially
          >
            <List isMini={ this.props.isMini } background={ this.props.background } color={ props.color }>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/info">Information</NavLink>
              <NavLink to="/calendar">Calendar</NavLink>
              <NavLink to="/background">Background</NavLink>
              <NavLink to="/overview">Overview</NavLink>
              <NavLink to="/shop">Gift Shop</NavLink>
            </List>
          </Hideable>

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
