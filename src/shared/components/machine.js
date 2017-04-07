import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexItem } from '../style/flexbox';
import { Span } from '../style/util'

const MachineWrapper = styled(FlexItem)`
  flex-direction: column;
  flex: 1 1 auto;
`;

const MachineImg = styled.img`
  width: 100%;
`;

const MachineCaption = styled.div`
  text-align: left;
  color: ${ COLORS.white };
  font-weight: bold;
  margin-bottom: 80px;
`;

const Machine = ({ data }, { localContext }) => (
  <MachineWrapper>
    <MachineImg src={ localContext.assetUrl(data.fullImg) }/>
    <MachineCaption>
      <p>
        <Span textTransform="uppercase">{ data.title },</Span>
        <Span color={ COLORS.gold }> from { data.year } </Span>
        <Span color={ COLORS.gold }>{ data.caption_a }, </Span>
        <Span>{ data.caption_b } </Span>
      </p>
    </MachineCaption>
  </MachineWrapper>
)

Machine.contextTypes =  {
  localContext: React.PropTypes.object
};

export { Machine };
