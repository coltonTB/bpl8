import { Link } from 'found';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Style = styled.div`
  a {
    display: block;
  }
  .content {
    background: papayawhip;
    text-align: center;
    padding: 1em;
  }
`;

export default props => {
  return (
    <Style>
      <h2>Demo App</h2>
      <Link to="/">Home</Link>
      <Link to="/page-1">Page1</Link>
      <Link to="/page-2">Page2</Link>
      <div className="content">
        { props.params.string }
      </div>
    </Style>
  );
}
