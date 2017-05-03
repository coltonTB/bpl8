import React from 'react';
import styled from 'styled-components';

const HeroScrollStyle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  img {
    height: 100%;
    margin: 0 20px;
  }
`;

export const HeroScroll = (props, {localContext}) => {

  function getImage() {
    const side = props.left ? 'left' : 'right';
    const base = '/images/machines';
    const images = ['01', '02', '03', '04'];
    const index = Math.floor(Math.random() * 4);
    return `${base}/${images[index]}_${side}.png`
  }

  return (
    <HeroScrollStyle>
      <img src={localContext.assetUrl(getImage())} />
    </HeroScrollStyle>
  );
};

HeroScroll.contextTypes = {
  localContext: React.PropTypes.object
};
