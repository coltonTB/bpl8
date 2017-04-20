import React from 'react';
import styled from 'styled-components';

const POLL_MS = 200;

const Style = styled.div`
  opacity: 1;
  visibility: visible;
  transition:
    opacity ${ props => props.duration } ${ props => props.ease } ${ props => props.delay },
    visibility ${ props => props.duration } ${ props => props.ease } ${ props => props.delay };
  &.visible {
    transition-delay: 0s;
  }
  &.hidden {
    opacity: 0;
    visibility: hidden;
  }
`;

export const Hideable = React.createClass({

  propTypes: {
    listen: React.PropTypes.bool,
    isVisible: React.PropTypes.any,
    forceVisibility: React.PropTypes.bool,
    showInitially: React.PropTypes.bool,
    hideInitially: React.PropTypes.bool
  },

  defaultProps: {
    listen: false,
    showInitially: true,
    hideInitially: false
  },

  getInitialState() {
    return {
      isVisible: (
        this.props.showInitially === true &&
        this.props.hideInitially === false
      )
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      isVisible: this.evaluateVisibility(nextProps)
    });
  },

  componentDidMount() {
    if (this.props.listen) {
      this.interval =
      window.setInterval(() => {
        this.setState({
          isVisible: this.evaluateVisibility(this.props)
        });
      }, POLL_MS)
    }
  },

  componentWillUnmount() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  },

  evaluateVisibility(props) {
    const getVisibility = () => {
      switch(typeof props.isVisible) {
        case 'function':
          return props.isVisible();
        case 'boolean':
          return props.isVisible;
        case 'undefined':
          return true;
        default:
          return false;
      }
    };

    // No need to update here
    if (props.forceVisibility) {
      return true;
    }
    return getVisibility();
  },


  render() {
    return (
      <Style
        {...this.props}
        className={ (this.props.forceVisibility || this.state.isVisible) ? 'visible' : 'hidden' }
      >
        { this.props.children }
      </Style>
    );
  }

});

Hideable.defaultProps = {
  duration: '0.4s',
  ease: 'ease',
  delay: '0s'
};
