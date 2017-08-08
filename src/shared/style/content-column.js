import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer, FlexItem } from './flexbox';

const Content = styled(FlexItem)`
  color: ${ props => props.color };
  padding: 1.6rem 3rem 1.6rem 1.6rem;
  max-width: ${ props => props.width };
  flex-wrap: wrap;
  flex-shrink: 1;
  flex-grow: 1;
  @media (max-width: 500px) {
    width: auto;
    padding: 3rem 3rem 0 3rem;
  }
`;

Content.defaultProps = {
  color: COLORS.white,
  width: '600px',
  overflow: 'hidden'
};

const ContentLeft = styled(Content)`
  padding: 1.6rem 1.6rem 1.6rem 3rem;
  text-align: right;
  flex-direction: row-reverse;
  @media (max-width: 500px) {
    text-align: left;
    padding: 3rem 3rem 0 3rem;
  }
`;

export { Content, ContentLeft };
