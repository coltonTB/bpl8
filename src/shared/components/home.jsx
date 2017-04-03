import React from 'react';
import {Link} from 'react-router';
import styled from 'styled-components';

import { COLORS } from '../constants';

import { FlexContainer, FlexItem } from './flexbox';
import { CenterNav, CenterNavInner, CenterNavList } from './center-nav';
import { Px, PxTitle, PxSection, PxLayer } from './parallax';


const HeroBgImage = styled(PxLayer)`
  background-image: url(${ props => props.imageUrl });
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 50%;
  height: 100%;
  width: 100%;
`;

const CenterNavPlaceholder = styled(CenterNavInner)`
  display: flex;
  position: static;
  background: none;
`;

const BgColor = styled(PxLayer)`
  background-color: ${props => props.color}
`;

const HeroText = styled(FlexItem)`
  color: ${ COLORS.white };
  font-size: 46pt;
  padding: 18px 28px;
  width: 26%;
  position: relative;
  bottom: 100px;
  line-height: 50pt;
`;

const Home = (props, context) => (
  <div className="rm--home">

    <CenterNav>
      <CenterNavList />
    </CenterNav>

    <Px>

      <PxSection zIndex={5}>

        <CenterNav>
          <CenterNavInner />
        </CenterNav>

        <PxLayer depth={0}>
          <FlexContainer>
            <HeroText style={{textAlign: 'right'}}>
              Radical Machines
            </HeroText>
            <CenterNavPlaceholder />
            <HeroText>
              Chinese in the Information Age
            </HeroText>
          </FlexContainer>
        </PxLayer>
        <PxLayer depth={-2} style={{background: COLORS.black }}/>
      </PxSection>

      <PxSection zIndex={5}>
        <CenterNav>
          <CenterNavInner background={ COLORS.black } style={{zIndex: 1}}/>
        </CenterNav>
        <PxLayer depth={0} style={{ background: COLORS.gold }} />
      </PxSection>

      <PxSection zIndex={5}>
        <PxLayer depth={3}>
          <PxTitle> Foreground</PxTitle>
        </PxLayer>
        <PxLayer depth={0} style={{background: 'purple'}}>
          <PxTitle> Background</PxTitle>
        </PxLayer>
      </PxSection>

      <PxSection zIndex={3}>
        <PxLayer depth={-2}>
          <PxTitle> Foreground</PxTitle>
        </PxLayer>
        <PxLayer depth={0}>
          <PxTitle> Mid</PxTitle>
        </PxLayer>
        <PxLayer depth={-5} style={{background: 'red'}}>
          <PxTitle> Background</PxTitle>
        </PxLayer>
      </PxSection>

    </Px>
  </div>
);

Home.contextTypes = {
  localContext: React.PropTypes.object
}

export default Home;
