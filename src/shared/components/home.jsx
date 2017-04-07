import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer, FlexItem } from '../style/flexbox';
import { Px, PxTitle, PxSection, PxLayer } from '../style/parallax';
import { Button, Img, H2, H5 } from '../style/util';

import { CenterNav, CenterNavInner, CenterNavList, CenterNavPlaceholder } from './center-nav';
import { HeroText, HeroTextLeft } from './hero-text';
import { Footer } from './footer';

const Home = (props, { localContext }) => {

  const content = key => localContext.content('home', key);

  return (
    <div>

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
              <CenterNavPlaceholder fullHeight />
              <HeroText>
                <h1>
                  { content('hero_text_right') }
                </h1>
              </HeroText>
            </FlexContainer>
          </PxLayer>
          <PxLayer depth={-2} background={ COLORS.black }/>
        </PxSection>

        <PxSection zIndex={5}>
          <CenterNav>
            <CenterNavInner background={ COLORS.black } zIndex={1} />
          </CenterNav>
          <PxLayer depth={0} background={ COLORS.gold }>
            <FlexContainer>
              <HeroTextLeft>
                <H2 color={ COLORS.black }>
                  { content('hero_2_title') }&mdash;
                </H2>
                <H2>
                  { content('hero_2_subtitle') }
                </H2>
              </HeroTextLeft>
              <CenterNavPlaceholder fullHeight />
              <HeroText>
                <div>
                  <Img src={ localContext.assetUrl('/images/hero_2.png') } height="26vh" />
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

        <PxSection zIndex={5} height="72vh">
          <PxLayer depth={0} background={COLORS.white} paddingTop={'24px'}>
            <FlexContainer>
              <HeroTextLeft align="flex-start">
                <H2 color={ COLORS.black }>
                  { content('video_title') }
                </H2>
              </HeroTextLeft>
              <CenterNavPlaceholder />
              <HeroText align="flex-start">
                <H5 color={ COLORS.gold }>
                  { content('video_subtitle') }
                </H5>
              </HeroText>
            </FlexContainer>

            <FlexContainer flexDirection="column">
              <Img src={ localContext.assetUrl('/images/video_preview.png') } height="50vh" />
            </FlexContainer>

          </PxLayer>
        </PxSection>

        <PxSection zIndex={5} height="60vh">
          <PxLayer depth={0} background={COLORS.white}>
            <FlexContainer>
              <HeroTextLeft align="flex-start">
                <H2 color={ COLORS.black }>
                  { content('insta_title') }
                </H2>
              </HeroTextLeft>
              <CenterNavPlaceholder />
              <HeroText align="flex-start">
                <H5 color={ COLORS.gold }>
                  { content('insta_subtitle') }
                </H5>
              </HeroText>
            </FlexContainer>

            <FlexContainer flexDirection="column">
              <Img src={ localContext.assetUrl('/images/insta_shim.png') } height="30vh" />
              <Button marginTop="40px">
                { content('see_more_btn') }
              </Button>
            </FlexContainer>
          </PxLayer>
        </PxSection>

        <PxSection height="50vh">
          <PxLayer depth={0} background={COLORS.gray} paddingTop="24px">
            <FlexContainer>
              <HeroTextLeft align="flex-start">
                <H2 color={ COLORS.black }>
                  { content('press_title') }
                </H2>
              </HeroTextLeft>
              <CenterNavPlaceholder />
              <HeroText align="flex-start">
                <H5 color={ COLORS.black }>
                  { content('press_subtitle') }
                </H5>
              </HeroText>
            </FlexContainer>
            <FlexContainer flexDirection="column">
              <Img src={ localContext.assetUrl('/images/press.png') } height="30vh" />
            </FlexContainer>
          </PxLayer>
        </PxSection>

        <PxSection height="40vh">
          <PxLayer depth={0} background={COLORS.black} paddingTop="24px">
            <Footer />
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
