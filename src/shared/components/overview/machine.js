import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { FlexItem } from '../../style/flexbox';
import { Span, P, Div } from '../../style/util'

const MachineWrapper = styled(Div)`
  opacity: ${ props =>
    props.selectedMachine === null || props.selectedMachine === props.data.id
      ? 1
      : 0
  };
  visibility: ${ props =>
    props.selectedMachine === null || props.selectedMachine === props.data.id
      ? 'visible'
      : 'hidden'
  };
  left: ${ props =>
    props.selectedMachine === props.data.id ? 0 : props.left
  }px;
  top: ${ props =>
    props.selectedMachine === props.data.id ? '12px' : props.top
  };
  width: 500px;
  position: absolute;
  transition:
    top 0.4s ease,
    left 0.4s ease,
    opacity .2s ease;
  @media (max-width: 1230px) {
    width: 420px;
    left: ${ props =>
      props.selectedMachine === props.data.id
        ? 0
        : (props.left !== 0 ? props.left - 115 : props.left)
    }px;
  }
  @media (max-width: 1000px) {
    width: 320px;
    left: ${ props =>
      props.selectedMachine === props.data.id
        ? 0
        : (props.left !== 0 ? props.left - 215 : props.left)
    }px;
  }
  @media (max-width: 800px) {
    width: 230px;
    left: ${ props =>
      props.selectedMachine === props.data.id
        ? 0
        : (props.left !== 0 ? props.left - 330 : props.left)
    }px;
  }
  img {
    width: 100%;
    &:hover {
      outline: ${ p => p.selectedMachine === null ? '4px solid #eee' : 'none' };
      cursor: pointer;
    }
  }
`;

MachineWrapper.defaultProps = {
  left: 0
};

const MachineCaption = styled.div`
  text-align: left;
  color: ${ COLORS.white };
  font-weight: bold;
  margin-bottom: 80px;
`;

const Machine = (props, { localContext }) => {
  return (
    <MachineWrapper
      { ...props }
      onClick={ (e) => {props.onClick(props.data); e.stopPropagation(); }}
    >
      <img src={ localContext.assetUrl(props.data.fullImg) }/>
      <MachineCaption>
        <p>
          <Span textTransform="uppercase">{ props.data.title },</Span>
          <Span color={ COLORS.gold }> from { props.data.year } </Span>
          <Span color={ COLORS.gold }>{ props.data.caption_a }, </Span>
          <Span>{ props.data.caption_b } </Span>
        </p>
      </MachineCaption>

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
