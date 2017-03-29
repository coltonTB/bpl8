import React from 'react';
import styled from 'styled-components';

const factor = 30;
const perspective = 600;

const calculateScale = depth => (
  1 - depth / perspective
);

export const Px = styled.div`
  perspective: ${perspective}px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const PxTitle = styled.div`
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const PxSection = styled.div`
  position: relative;
  height: 100vh;
  transform-style: preserve-3d;
`;

export const PxLayer = styled.div`
  __comment: depth ${props => props.depth};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${ props => props.depth };
  transform:
    translateZ(${ props => factor * props.depth }px)
    scale(${ props => calculateScale(factor * props.depth) });
`

PxLayer.defaultProps = {
  depth: 0
}
