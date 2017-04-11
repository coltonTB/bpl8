import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer, FlexItem } from '../style/flexbox';

const HeroText = styled(FlexItem)`
  color: ${ props => props.color };
  padding: 18px 28px;
  width: ${ props => props.width };
  flex-wrap: wrap;
  flex-shrink: 0;
`;

HeroText.defaultProps = {
  color: COLORS.white,
  width: '500px'
};

const HeroTextLeft = styled(HeroText)`
  text-align: right;
  flex-direction: row-reverse;
`;

export { HeroText, HeroTextLeft };
