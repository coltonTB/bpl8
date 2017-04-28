import React from 'react';
import ReactSVG from 'react-svg'
import styled from 'styled-components';

import { COLORS } from '../constants';
import { Div } from '../style/util';
import { Hideable } from '../style/hideable';

const ScrollPromptWrapper = styled(Div)`
  position: absolute;
  bottom: 0;
  z-index: 1;
  margin-bottom: 30px;
  color: ${ COLORS.white };
  width: 100%;
`;
const ScrollPromptInner = styled.div`
  width: 45px;
  width: 3.2vw;
  margin-right: auto;
  margin-left: auto;
  left: 0;
  right: 0;
  text-align: center;
  .scroll-svg {
    fill: ${ COLORS.white };
    width: 2.3vw;
  }
  div.text {
    font-weight: bold;
    font-size: 1.1vw;
  }
`;

export const ScrollPrompt = (props, {localContext}) => (
  <ScrollPromptWrapper className="scroll-prompt-wrapper">
    <ScrollPromptInner>
      <Hideable isVisible={ props.isVisible } listen>
        <div className="text">
          Scroll
        </div>
        <ReactSVG
          path={ localContext.assetUrl('/images/down_arrow.svg') }
          className="scroll-svg"
        />
      </Hideable>
    </ScrollPromptInner>
  </ScrollPromptWrapper>
);

ScrollPrompt.contextTypes = {
  localContext: React.PropTypes.object
};
