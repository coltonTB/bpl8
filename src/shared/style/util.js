import React from 'react';
import styled, { css } from 'styled-components'
import cssName from 'css-name';

import { COLORS } from '../constants';

const domElements = [
  'a',
  'button',
  'div',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'img',
  'input',
  'ol',
  'p',
  'span',
  'ul',
];

const sharedFeatures = [
  'background',
  'color',
  'fontSize',
  'fontWeight',
  'height',
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'position',
  'textTransform',
  'textAlign',
  'top',
  'bottom',
  'left',
  'right',
  'width',
  'zIndex'
];

const conditionalProp = (props, propName) => {
  return props => props[propName]
    ? `${cssName(propName)}: ${props[propName]};`
    : '';
};

domElements.forEach(element => {
  const capitalName = element.charAt(0).toUpperCase() + element.slice(1);
  const features = css`
    ${sharedFeatures.map(feature => props => conditionalProp(props, feature))}
  `;
  module.exports[capitalName] = styled[element]`
    ${ features }
  `;
});

/*
  Override for Button
*/
export const Button = styled(module.exports.Button)`
  border: none;
  border-radius: 0;
  padding: 12px 36px;
`;
Button.defaultProps = {
  background: COLORS.gold,
  color: COLORS.white,
  fontWeight: 'bold',
  fontSize: '1.4rem'
};

/*
  Override for Input
*/
export const Input = styled(module.exports.Input)`
  border: 1px solid ${ COLORS.gold };
  padding: 6px 12px;
`;
Input.defaultProps = {
  background: COLORS.black,
  color: COLORS.white,
  fontSize: '1.5em'
};
