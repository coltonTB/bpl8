import React from 'react';
import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${ props => props.flexDirection || 'row' };
  justify-content: ${ props => props.justifyContent || 'center' };
  align-items: ${ props => props.align || 'center' };
  align-content: ${ props => props.align || 'center' };
`;

export const FlexItem = styled.div`
  display: flex;
  flex-direction: ${ props => props.flexDirection || 'row' };
`;
