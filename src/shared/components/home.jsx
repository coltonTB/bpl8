import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { FlexContainer, FlexItem } from '../style/flexbox';
import { Button, Img, Div, H2, H3, H5 } from '../style/util';

import { CenterNav, CenterNavInner, CenterNavList, CenterNavPlaceholder, ScrollPrompt } from './center-nav';
import { HeroText, HeroTextLeft } from './hero-text';
import { Footer } from './footer';

const Home = (props, { localContext }) => {

  const content = key => localContext.content('home', key);

  return (
    <div>

      <CenterNav>
        <CenterNavList />
        <ScrollPrompt />
      </CenterNav>

        <Div background={ COLORS.black }>
          <CenterNav>
            <CenterNavInner background={ COLORS.gold } position="absolute" />
          </CenterNav>
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
        </Div>

        <Div>
          <CenterNav>
            <CenterNavInner background={ COLORS.black } position="absolute" />
          </CenterNav>

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
                <Img src={ localContext.assetUrl('/images/hero_2.png') } height="300px" />
              </div>
              <H3 margin="16px 0 8px 0">
                { content('hero_2_caption') }
              </H3>
              <p>
                { content('hero_2_text') }
              </p>
            </HeroText>
          </FlexContainer>

        </Div>

        <Div background={COLORS.white} padding="30px 0 70px 0">
          <FlexContainer marginBottom="20px">
            <HeroTextLeft>
              <H2 color={ COLORS.black }>
                { content('video_title') }
              </H2>
            </HeroTextLeft>
            <CenterNavPlaceholder />
            <HeroText>
              <H5 color={ COLORS.gold }>
                { content('video_subtitle') }
              </H5>
            </HeroText>
          </FlexContainer>

          <FlexContainer flexDirection="column">
            <Img src={ localContext.assetUrl('/images/video_preview.png') } height="50vh" />
          </FlexContainer>
        </Div>

        <Div background={COLORS.white} paddingBottom="40px">
          <FlexContainer marginBottom="20px">
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

        </Div>

        <Div background={COLORS.gray} padding="40px 0">
          <FlexContainer>
            <HeroTextLeft>
              <H2 color={ COLORS.black }>
                { content('press_title') }
              </H2>
            </HeroTextLeft>
            <CenterNavPlaceholder />
            <HeroText>
              <H5 color={ COLORS.black }>
                { content('press_subtitle') }
              </H5>
            </HeroText>
          </FlexContainer>
          <FlexContainer flexDirection="column">
            <Img src={ localContext.assetUrl('/images/press.png') } height="30vh" />
          </FlexContainer>
        </Div>

        <Footer />

    </div>
  );
}

Home.contextTypes = {
  localContext: React.PropTypes.object
}

export default Home;
