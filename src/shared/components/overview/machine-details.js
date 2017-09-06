import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { A, P, Span } from '../../style/util';
import { COLORS } from '../../constants';

const StyledAnchor = styled.a`
  color: ${ COLORS.gold };
  text-decoration: underline;
  font-weight: bold;
`;

const SourceLink = React.createClass({
  defaultProps: {
    offset: 0
  },
  render() {
    return (
      <StyledAnchor>
        { this.props.children }
      </StyledAnchor>
    );
  }
});

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

export const MachineDetails = (props, {localContext}) => {
  const selectedMachine = props.selectedMachine;
  const data = localContext.getContent('overview', `machineDetails.${selectedMachine}`) || {};
  const body = localContext.getContent('overview', `machineDetails.${selectedMachine}.body`);

  return (
    <MachineDetailsWrapper {...props}>
      <h3>
        <Span color={ COLORS.white } textTransform="uppercase">
          { data.title },&nbsp;
        </Span>
        <Span color={ COLORS.gold }>
          { data.subtitle }
        </Span>
      </h3>
      <MachineDetailsContent
        onSourceLinksMounted={ props.onSourceLinksMounted }
        body={ body }
      />
    </MachineDetailsWrapper>
  );
};

MachineDetails.contextTypes = {
  localContext: React.PropTypes.object
};

export const MachineDetailsContent = React.createClass({

  propTypes: {
    onSourceLinksMounted: React.PropTypes.func
  },

  componentDidMount() {
    const sourceLinks = Object.keys(this.refs).map(ref => ({
      id: ref,
      el: ReactDOM.findDOMNode(this.refs[ref]),
      customOffset: this.refs[ref].props.offset
    }));
    this.props.onSourceLinksMounted(sourceLinks);
  },

  render() {
    return (
      <P color={ COLORS.white } onClick={ e => e.stopPropagation() }>
        { this.props.body }
      </P>
    );
  }
});
