import React from 'react';
import styled from 'styled-components';

import { Div } from './util';

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${ props => props.flexDirection };
  justify-content: ${ props => props.justifyContent };
  align-items: ${ props => props.align };
  align-content: ${ props => props.align };
  flex-wrap: ${ props => props.wrap ? 'wrap' : 'nowrap' };
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

FlexContainer.defaultProps = {
  flexDirection: 'row',
  justifyContent: 'center',
  align: 'center',
  wrap: false
};

export const FlexItem = styled(Div)`
  display: flex;
  flex-direction: ${ props => props.flexDirection };
  align-self: ${ props => props.align }
`;

FlexItem.defaultProps = {
  flexDirection: 'row',
  align: 'center'
};
