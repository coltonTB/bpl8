import React from 'react';
import {Link} from 'react-router';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer, FlexItem } from '../style/flexbox';
import { Px, PxTitle, PxSection, PxLayer } from '../style/parallax';

import { CenterNav, CenterNavInner, CenterNavList } from './center-nav';

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
  color: ${ props => props.color || COLORS.white };
  padding: 18px 28px;
  width: ${ props => props.width || '400px' };
  position: relative;
  /* correct for center misalignment */
  bottom: ${ props => props.align === 'flex-start' ? '0' : '100px' };
  flex-wrap: wrap;
`;

const HeroTextLeft = styled(HeroText)`
  text-align: right;
  flex-direction: row-reverse;
`;

const HeroImage = styled.img`
  width: 500px;
  margin-bottom: 12px;
`;

const Home = (props, { localContext }) => {

  const content = key => localContext.content('home', key);

  return (
    <div className="rm--home">
      <CenterNav>
        <CenterNavList />
      </CenterNav>
      <Px>

        <PxSection zIndex={5}>
          <CenterNav>
            <CenterNavInner />
          </CenterNav>
          <PxLayer depth={1}>
            <FlexContainer>
              <HeroTextLeft>
                <h1>
                  { content('hero_text_left') }
                </h1>
              </HeroTextLeft>
              <CenterNavPlaceholder />
              <HeroText>
                <h1>
                  { content('hero_text_right') }
                </h1>
              </HeroText>
            </FlexContainer>
          </PxLayer>
          <PxLayer depth={-2} style={{ background: COLORS.black }}/>
        </PxSection>

        <PxSection zIndex={5}>
          <CenterNav>
            <CenterNavInner background={ COLORS.black } style={{ zIndex: 1 }}/>
          </CenterNav>
          <PxLayer depth={0} style={{ background: COLORS.gold }}>
            <FlexContainer>
              <HeroTextLeft>
                <h2 style={{ color: COLORS.black }}>
                  { content('hero_2_title') }
                </h2>
                <h2>
                  { content('hero_2_subtitle') }
                </h2>
              </HeroTextLeft>
              <CenterNavPlaceholder />
              <HeroText>
                <div>
                  <HeroImage src={ localContext.assetUrl('/images/hero_2.png') } />
                </div>
                <h4>
                  { content('hero_2_caption') }
                </h4>
                <p>
                  { content('hero_2_text') }
                </p>
              </HeroText>
            </FlexContainer>
          </PxLayer>
        </PxSection>

        <PxSection zIndex={5}>
          <PxLayer depth={0} style={{background: COLORS.white, paddingTop: '24px'}}>
            <FlexContainer>
              <HeroTextLeft align="flex-start">
                <h2 style={{ color: COLORS.black }}>
                  { content('video_title') }
                </h2>
              </HeroTextLeft>
              <CenterNavPlaceholder />
              <HeroText align="flex-start">
                <h5 style={{ color: COLORS.gold }}>
                  { content('video_subtitle') }
                </h5>
              </HeroText>

              <div style={{
                textAlign: 'center',
                width: '100vw',
                position: 'absolute',
                top: '220px'
              }}>
                <img
                  style={{
                    width: '90%'
                  }}
                  src={ localContext.assetUrl('/images/video_preview.png') } />
              </div>

            </FlexContainer>
          </PxLayer>
        </PxSection>

      </Px>
    </div>
  );
}

Home.contextTypes = {
  localContext: React.PropTypes.object
}

export default Home;
