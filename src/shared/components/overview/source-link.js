import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

const SourceLinkStyle = styled.div`
  color: ${ COLORS.white };
  text-align: center;
  position: fixed;
  top: 45%;
  width: 140px;
  box-sizing: border-box;
  padding: 0 10px;
  z-index: 2;
  @media (max-width: 1230px) {
    width: 120px;
  }
`;
const Number = styled.h5`
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #ddd;
  }
`
export const SourceLink = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    onClick: React.PropTypes.func
  },
  render() {
    return (
      <SourceLinkStyle>
        <Number onClick={() => this.props.onClick(this.props.id)}>
          { this.props.id }
        </Number>
        {
          this.props.id && (
            <div>
              Few thousands of characters.
              No alphabet.
              Millions of customers await whoever solves the puzzle first.
            </div>
          )
        }
      </SourceLinkStyle>
    );
  }
});
