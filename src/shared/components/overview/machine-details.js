import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { A, P, Span } from '../../style/util';
import { COLORS } from '../../constants';

const MachineDetailsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: ${ props => props.leftOffset }px;
  opacity: ${ props => props.selectedMachine === null
    ? 0
    : 1
  };
  display: ${ props => props.selectedMachine === null
    ? 'none'
    : 'initial'
  };
  transition: opacity 0.3s ease-in-out 1s;
  color: { COLORS.white };

  a.source-link {
    color: ${ COLORS.gold };
    text-decoration: underline;
    font-weight: bold;
  }

  @media (max-width: 1230px) {
    left: ${ props =>
      props.leftOffset !== 0 ? props.leftOffset - 115 : props.leftOffset
    }px;
  }
  @media (max-width: 1000px) {
    left: ${ props =>
      props.leftOffset !== 0 ? props.leftOffset - 215 : props.leftOffset
    }px;
  }
  @media (max-width: 800px) {
    left: ${ props =>
      props.leftOffset !== 0 ? props.leftOffset - 330 : props.leftOffset
    }px;
  }
  @media (max-width: 800px) {
    position: static;
  }
`;

export const MachineDetails = React.createClass({

  propTypes: {
    onSourceLinksMounted: React.PropTypes.func
  },

  componentDidMount() {
    const links = Array.from(
      document.querySelectorAll('a.source-link')
    );

    const sourceLinks = links.map(el => ({
      id: el.dataset.id,
      el
    }));
    this.props.onSourceLinksMounted(sourceLinks);
  },

  render() {
    const getContent = key => this.context.localContext.getContent('overview', `machineDetails.${ this.props.selectedMachine }.${ key }`, true);
    return (
      <MachineDetailsWrapper {...this.props}>
        <h3>
          <Span color={ COLORS.white } textTransform="uppercase">
            { getContent('title') }
          </Span>
          &nbsp;
          <Span color={ COLORS.gold }>
            { getContent('subtitle') }
          </Span>
        </h3>
        <P color={ COLORS.white } onClick={ e => e.stopPropagation() }>
          { getContent('body') }
        </P>
      </MachineDetailsWrapper>
    );
  }
});

MachineDetails.contextTypes = {
  localContext: React.PropTypes.object
};
