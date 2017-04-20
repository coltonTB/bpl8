import React from 'react';
import ReactSVG from 'react-svg'
import { Link as UnstyledLink } from 'react-router';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { Ul, Div } from '../style/util';
import { Hideable } from '../style/hideable';

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
  list-style: none;
  padding: 0;
  margin-top: 12px;
  font-size: 1.2em;
  line-height: 1.4em;
`;

const Fixed = styled.div`
  position: fixed;
  z-index: 1;
  text-align: center;
  margin-top: 1em;
`;

const Link = styled(UnstyledLink)`
  text-decoration: none;
  color: ${ props => props.color };
  font-weight: bold;
  cursor: 'pointer';
  font-style: 'normal';
  &.active {
    cursor: default;
    font-style: italic;
  }
`;
Link.defaultProps = {
  activeClassName: 'active'
};

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
      <CenterNavWrapper>
        <Fixed>
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
            <List>
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
          </Hideable>

        </Fixed>
        { props.children }
      </CenterNavWrapper>
    );
  }
});

CenterNav.contextTypes = {
  localContext: React.PropTypes.object
};

CenterNav.defaultProps = {
  color: COLORS.white
};
