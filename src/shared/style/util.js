import React from 'react';
import styled, { css } from 'styled-components'

import { COLORS } from '../constants';

export const Button = styled.button`
  background: ${ COLORS.gold };
  border: none;
  border-radius: 0;
  color: ${ COLORS.white };
  font-weight: bold;
  font-size: 1.5rem;
  padding: 0 36px;
`;
