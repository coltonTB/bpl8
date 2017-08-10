import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinUp = keyframes`
  0% { transform: translateY(1000px); opacity: 0; }
  5%, 95% { transform: translateY(0px); opacity: 1; }
  100% { transform: translateY(-1000px); opacity: 0; }
`;
const spinDown = keyframes`
  0% { transform: translateY(-1000px); opacity: 0; }
  5%, 95% { transform: translateY(0px); opacity: 1; }
  100% { transform: translateY(1000px); opacity: 0; }
`;

const HeroScrollStyle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  img {
    position: absolute;
    ${ p => p.direction === 'up' ? 'right' : 'left' }: 0;
    height: 100%;
    margin: 0 20px;
    transform: ${ p =>
      p.direction === 'up' ? 'translateY(1000px)' : 'translateY(-1000px)'
    };
    @media (min-width: 500px) {
      &.animate {
        transform: translateY( ${ p => p.direction === 'up' ? '-' : ''}1000px );
        animation-name: ${ p => p.direction === 'up' ? spinUp : spinDown };
        animation-duration: 6s;
        animation-timing-function: ease;
        animation-delay: 0;
        animation-iteration-count: infinite;
      }
    }

  }
`;

export const HeroScroll = React.createClass({

  propTypes: {
    left: React.PropTypes.bool,
    right: React.PropTypes.bool
  },

  contextTypes: {
    localContext: React.PropTypes.object
  },

  animationDelay: 6,

  getInitialState() {
    return {
      isAnimating: false,
      imageUrl: null
    };
  },

  componentDidMount() {
    this.setState({
      isAnimating: true,
      imageUrl: this.getImage()
    });
    this.interval = window.setInterval(() => {
      this.setState({
        imageUrl: this.getImage()
      });
    }, this.animationDelay * 1000);
  },

  componentWillUnmount() {
    this.interval && window.clearInterval(this.interval);
    this.setState({
      isAnimating: false
    });
  },

  getImage(defaultIndex) {
    const side = this.props.left ? 'left' : 'right';
    const base = '/images/machines';
    const images = ['01', '02', '03', '04'];
    const index = defaultIndex || Math.floor(Math.random() * 4);
    return `${base}/${images[index]}_${side}.png`
  },

  render() {
    const localContext = this.context.localContext;
    return (
      <HeroScrollStyle direction={ this.props.left ? 'up' : 'down' }>
        <img
          className={ this.state.isAnimating ? 'animate' : '' }
          src={ localContext.assetUrl(this.state.imageUrl) }
        />
      </HeroScrollStyle>
    );
  }

});
