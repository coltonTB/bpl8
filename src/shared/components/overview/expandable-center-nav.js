import React from 'react';
import styled from 'styled-components';
import ReactSVG from 'react-svg'

import { COLORS } from '../../constants';
import { FlexContainer } from '../../style/flexbox';
import { Hideable } from '../../style/hideable';

import { HeroText, HeroTextLeft } from '../../style/hero-text';
import { CenterNavBackground } from '../center-nav';

import { Source1Text, Source1Images } from './sources';

const stopProp = e => e.stopPropagation();

const ExpandableCenterNavStyle = styled.div`
  background: ${ COLORS.gold };
  height: 100vh;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  overflow: ${ props => props.selectedSourceLink === null ? 'hidden' : 'scroll' };
  position: fixed;
  right: 0;
  opacity: ${ props => props.selectedMachine === null ? 0 : 1 };
  width: ${ props => props.selectedSourceLink === null ? '140px' : '100%' };
  transition: width 0.2s ease-out;
  z-index: 1;
`;

const SourceCloseButton = styled.div`
  text-transform: uppercase;
  color: ${ COLORS.white };
  cursor: pointer;
  position: fixed;
  top: 45%;
  width: 140px;
  span {
    display: inline-block;
    padding-top: 14px;
    text-decoration: underline;
  }
`;

export const ExpandableCenterNav = (props, {localContext}) => (
  <ExpandableCenterNavStyle
    onClick={ stopProp }
    selectedMachine={ props.selectedMachine }
    selectedSourceLink={ props.selectedSourceLink }
  >
    <FlexContainer>
      <HeroTextLeft align="flex-start">
        <h2>
          { localContext.getContent('overview', 'title') }
        </h2>
      </HeroTextLeft>
      <CenterNavBackground />
      <HeroText color={ COLORS.white } align="flex-start">
        <h5>
          { localContext.getContent('overview', 'subtitle') }
        </h5>
      </HeroText>
    </FlexContainer>
    <FlexContainer>
      <HeroTextLeft align="flex-start">
        <Source1Images />
      </HeroTextLeft>
      <CenterNavBackground textAlign="center">
        <Hideable isVisible={ props.selectedSourceLink !== null } hideInitially>
          <SourceCloseButton onClick={ props.onCloseClick }>
            <ReactSVG
              path={ localContext.assetUrl('/images/close.svg') }
              style={{
                fill: COLORS.white,
                height: '46px',
                width: '100%',
                textAlign: 'center'
              }}
            />
            <span>close</span>
          </SourceCloseButton>
        </Hideable>
      </CenterNavBackground>
      <HeroText color={ COLORS.white } align="flex-start" >
        <Source1Text />
      </HeroText>
    </FlexContainer>
  </ExpandableCenterNavStyle>
);

ExpandableCenterNav.contextTypes = {
  localContext: React.PropTypes.object
};
