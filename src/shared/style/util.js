import React from 'react';
import styled, { css } from 'styled-components'

import { COLORS } from '../constants';

export const Button = styled.button`
  background: ${ COLORS.gold };
  border: none;
  border-radius: 0;
  color: ${ COLORS.white };
  font-weight: bold;
  font-size: 1.4rem;
  padding: 12px 36px;
`;
