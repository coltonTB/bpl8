import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexItem } from '../style/flexbox';
import { Span } from '../style/util'

const MachineWrapper = styled(FlexItem)`
  flex-direction: column;
  flex: 1 1 auto;
  visibility: ${ props => props.visible ? 'visible' : 'hidden' };
  position: relative;
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

const MachineDetailsWrapper = styled.div`
  ${
    props => props.orientation === 'right'
      ? "right: -700px"
      : "left: -700px"
  };
  ${
    props => props.orientation === 'right'
      ? "text-align: left"
      : "text-align: right"
  };
  position: absolute;
  top: 0;
  visibility: ${ props => props.visible ? 'visible' : 'hidden' };
  width: 100%;
  background: red;
`;

const MachineDetails = props => (
  <MachineDetailsWrapper {...props}>
    HI
  </MachineDetailsWrapper>
)

const Machine = (props, { localContext }) => {
  return (
    <MachineWrapper
      onClick={ (e) => {props.onClick(props.data); e.stopPropagation(); }}
      visible={ props.selectedMachine === null || props.selectedMachine === props.data.id}
    >
      <MachineImg src={ localContext.assetUrl(props.data.fullImg) }/>
      <MachineCaption>
        <p>
          <Span textTransform="uppercase">{ props.data.title },</Span>
          <Span color={ COLORS.gold }> from { props.data.year } </Span>
          <Span color={ COLORS.gold }>{ props.data.caption_a }, </Span>
          <Span>{ props.data.caption_b } </Span>
        </p>
      </MachineCaption>

      <MachineDetails
        data={ props.data }
        visible={ props.selectedMachine === props.data.id }
        orientation={ props.detailsOrientation }
      />
    </MachineWrapper>
  );
}

Machine.contextTypes =  {
  localContext: React.PropTypes.object
};

Machine.propTypes = {
  data: React.PropTypes.object,
  onClick: React.PropTypes.func,
  selectedMachine: React.PropTypes.number,
  detailsOrientation: React.PropTypes.oneOf(['left', 'right'])
}

export { Machine };
