import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { FlexItem } from '../../style/flexbox';
import { Span, P, Div } from '../../style/util'

const MachineWrapper = styled(Div)`
  opacity: ${ props =>
    props.selectedMachine === null || props.selectedMachine === props.machineId
      ? 1
      : 0
  };
  visibility: ${ props =>
    props.selectedMachine === null || props.selectedMachine === props.machineId
      ? 'visible'
      : 'hidden'
  };
  left: ${ props =>
    props.selectedMachine === props.machineId ? 0 : props.left
  }px;
  top: ${ props =>
    props.selectedMachine === props.machineId ? '12px' : props.top
  };
  width: 500px;
  position: absolute;
  transition:
    top 0.4s ease,
    left 0.4s ease,
    opacity .2s ease;

  u {
    text-decoration: none;
    color: ${ COLORS.gold };
  }

  @media (max-width: 1230px) {
    width: 420px;
    left: ${ props =>
      props.selectedMachine === props.machineId
        ? 0
        : (props.left !== 0 ? props.left - 115 : props.left)
    }px;
  }
  @media (max-width: 1000px) {
    width: 320px;
    left: ${ props =>
      props.selectedMachine === props.machineId
        ? 0
        : (props.left !== 0 ? props.left - 215 : props.left)
    }px;
  }
  @media (max-width: 800px) {
    width: 230px;
    left: ${ props =>
      props.selectedMachine === props.machineId
        ? 0
        : (props.left !== 0 ? props.left - 330 : props.left)
    }px;
  }
  @media (max-width: 500px) {
    width: 100%;
    position: static;
    display: ${ props =>
      props.selectedMachine === null || props.selectedMachine === props.machineId
        ? 'block'
        : 'none'
    };
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
  @media (max-width: 500px) {
    margin-bottom: 40px;
  }
`;

const Machine = (props, { localContext }) => {
  const getContent = (key, forceHTML) => localContext.getContent('overview', `machines.${ props.machineId }.${ key }`, forceHTML);
  return (
    <MachineWrapper
      { ...props }
      onClick={ e => { props.onClick(props.machineId); e.stopPropagation(); }}
    >
      <img src={ localContext.assetUrl( getContent('fullImg') ) }/>
      <MachineCaption>
        <p>
          <Span textTransform="uppercase">
            { getContent('title', true) }
          </Span>
          &nbsp;
          <Span>
            { getContent('caption', true) }
          </Span>
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
