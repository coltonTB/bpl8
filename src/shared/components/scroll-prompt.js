import React from 'react';
import ReactSVG from 'react-svg'
import styled from 'styled-components';

import { COLORS } from '../constants';
import { Div } from '../style/util';

const ScrollPromptWrapper = styled(Div)`
  position: absolute;
  bottom: 0;
  z-index: 1;
  margin-bottom: 30px;
  color: ${ COLORS.white }
`;

export const ScrollPrompt = (props, {localContext}) => (
  <ScrollPromptWrapper>
    <div>
      Scroll
    </div>
    <ReactSVG
      path={ localContext.assetUrl('/images/down_arrow.svg') }
      style={{
        fill: COLORS.white
      }}
    />
  </ScrollPromptWrapper>
);

ScrollPrompt.contextTypes = {
  localContext: React.PropTypes.object
};
