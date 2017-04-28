import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer, FlexItem } from '../style/flexbox';

const Content = styled(FlexItem)`
  color: ${ props => props.color };
  padding: 40px 28px 18px 28px;
  padding: 1.6vw;
  width: ${ props => props.width };
  flex-wrap: wrap;
  flex-shrink: 0;
  flex-grow: 1;
  > h5 {
    padding-right: 20%;
  }
`;

Content.defaultProps = {
  color: COLORS.white,
  width: '500px'
};

const ContentLeft = styled(Content)`
  text-align: right;
  flex-direction: row-reverse;
`;

export { Content, ContentLeft };
