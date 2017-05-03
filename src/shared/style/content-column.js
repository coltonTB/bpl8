import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer, FlexItem } from '../style/flexbox';

const Content = styled(FlexItem)`
  color: ${ props => props.color };
  padding: 1.6rem 3rem 1.6rem 1.6rem;
  max-width: ${ props => props.width };
  flex-wrap: wrap;
  flex-shrink: 1;
  flex-grow: 1;
  overflow: hidden;
  > h5 {
    padding-right: 20%;
    &.nopad {
      padding-right: 0;
    }
  }
`;

Content.defaultProps = {
  color: COLORS.white,
  width: '600px'
};

const ContentLeft = styled(Content)`
  padding: 1.6rem 1.6rem 1.6rem 3rem;
  text-align: right;
  flex-direction: row-reverse;
`;

export { Content, ContentLeft };
