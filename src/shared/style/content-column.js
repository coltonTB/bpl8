import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer, FlexItem } from '../style/flexbox';

const Content = styled(FlexItem)`
  color: ${ props => props.color };
  padding: 40px 28px 18px 28px;
  width: ${ props => props.width };
  flex-wrap: wrap;
  flex-shrink: 0;
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
